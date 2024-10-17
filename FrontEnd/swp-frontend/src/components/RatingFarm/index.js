import React, { useState, useEffect } from "react";
import { Card, Rate, Input, Button, message, Spin } from "antd";
import { get, post, put, del } from "../../utils/request";
import "./RatingFarm.scss";

const { TextArea } = Input;
const RatingFarm = ({ farmId, userId }) => {
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(null);
  const [ratingValue, setRatingValue] = useState(0);
  const [comment, setComment] = useState("");
  const fetchApiRating = async () => {
    const res = get(`rating/view/${farmId}&${userId}`);
    try {
      if (res) {
        setUserRating(res);
        setRatingValue(res.rate);
        setComment(res.content || "");
      }
    } catch (error) {
      console.error("Fetch failed api: ", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchApiRating(); // eslint-disable-next-line
  }, [farmId, userId]);

  const handleRateChange = (value) => {
    setRatingValue(value);
    console.log(value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const data = { rate: ratingValue, content: comment };
      let response;
      if (userRating) {
        response = await put(`rating/update/${farmId}&${userId}`, data);
      } else {
        response = await post(`rating/create/${farmId}&${userId}`, data);
      }
      if (response) {
        message.success("Đánh giá đã được gửi thành công!");
        fetchApiRating();
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      message.error("Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async () => {
    try {
      setLoading(true);
      await del(`rating/delete,${farmId}&${userId}`);
      message.success("Đánh giá đã được xóa thành công!");
      setUserRating(null);
      setRatingValue(0);
      setComment("");
    } catch (error) {
      console.error("Error deleting rating:", error);
      message.error("Có lỗi xảy ra khi xóa đánh giá. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <Spin />;
  }
  return (
    <div>
      <Card className="rating-farm" title="Đánh giá trang trại">
        <p>Đánh giá của bạn:</p>
        <Rate value={ratingValue} onChange={handleRateChange} />
        <TextArea
          rows={4}
          value={comment}
          onChange={handleCommentChange}
          placeholder="Nhập nhận xét của bạn"
        />
        <div className="button-group">
          {userRating ? (
            <>
              <Button type="primary" onClick={handleSubmit}>
                Cập nhật đánh giá
              </Button>
              <Button type="primary" danger onClick={handleDelete}>
                Xóa đánh giá
              </Button>
            </>
          ) : (
            <Button type="primary" onClick={handleSubmit}>
              Gửi đánh giá
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default RatingFarm;
