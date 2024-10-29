import React, { useState, useEffect } from "react";
import { Card, Rate, Input, Button, message, Spin, Popconfirm } from "antd";
import { get, post, put, del } from "../../utils/request";
import "./RatingFarm.scss";

const { TextArea } = Input;

const RatingFarm = ({ farmId, userId, onReload }) => {
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(null);
  const [ratingValue, setRatingValue] = useState(0);
  const [comment, setComment] = useState("");

  const fetchApiRating = async () => {
    try {
      const res = await get(`rating/view/${farmId}&${userId}`);
      if (res) {
        setUserRating(res);
        setRatingValue(res.rate);
        setComment(res.content || "");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (farmId && userId) {
      fetchApiRating();
    }
  }, [farmId, userId]);

  const handleRateChange = (value) => {
    setRatingValue(value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const validateInput = () => {
    if (!ratingValue) {
      message.error("Vui lòng chọn số sao đánh giá!");
      return false;
    }
    if (!comment.trim()) {
      message.error("Vui lòng nhập nội dung đánh giá!");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateInput()) return;

    try {
      setLoading(true);
      const data = {
        farmId: farmId,
        userId: userId,
        rate: ratingValue,
        content: comment.trim(),
        ratingDate: new Date().toISOString(),
      };

      let response;
      if (!userRating) {
        response = await post(`rating/create/${farmId}&${userId}`, data);
      } else {
        response = await put(`rating/update/${farmId}&${userId}`, data);
      }

      if (response) {
        message.success("Đánh giá đã được gửi thành công!");
        onReload();
      } else {
        message.success("Đánh giá đã cập nhập thành công!");
      }
      onReload();

      await fetchApiRating();
    } catch (error) {
      console.error("Error submitting rating:", error);
      message.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await del(`rating/delete`, `${farmId}&${userId}`);

      if (response) {
        message.success("Xóa đánh giá thành công!");
        setUserRating(null);
        setRatingValue(0);
        setComment("");
        onReload();
      } else {
        throw new Error("Không thể xóa đánh giá");
      }
    } catch (error) {
      console.error("Error deleting rating:", error);
      message.error("Có lỗi xảy ra khi xóa đánh giá. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <div>
        <Card className="rating-farm" title="Đánh giá trang trại">
          <p>Đánh giá của bạn:</p>
          <Rate
            value={ratingValue}
            onChange={handleRateChange}
            style={{ marginBottom: "10px" }}
          />
          <TextArea
            rows={4}
            value={comment}
            onChange={handleCommentChange}
            placeholder="Nhập nhận xét của bạn (bắt buộc)"
            style={{ marginBottom: "15px" }}
          />
          <div className="button-group">
            {userRating ? (
              <>
                <Button
                  type="primary"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  Cập nhật đánh giá
                </Button>
                <Popconfirm
                  title="Bạn chắc chắn có muốn xóa không?"
                  onConfirm={handleDelete}
                >
                  <Button type="primary" disabled={loading}>
                    Xóa đánh giá
                  </Button>
                </Popconfirm>
              </>
            ) : (
              <Button type="primary" onClick={handleSubmit} disabled={loading}>
                Gửi đánh giá
              </Button>
            )}
          </div>
        </Card>
      </div>
    </>
  );
};

export default RatingFarm;
