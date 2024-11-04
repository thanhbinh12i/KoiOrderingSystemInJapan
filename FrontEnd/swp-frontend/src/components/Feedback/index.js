import React, { useState } from "react";
import { Form, Input, Button, Rate, Upload, message } from "antd";
import { UploadOutlined, HeartFilled } from "@ant-design/icons";
import "./Feedback.scss";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

function Feedback() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const userId = localStorage.getItem("id");
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    const formData = new FormData();
    if (!file) {
      messageApi.error("Vui lòng chọn ảnh trước khi gửi");
      setLoading(false);
      return;
    }
    formData.append("files", file);
    formData.append("Rating", values.Rating.toString());
    formData.append("Content", values.Content);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}feedback/create/${userId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        messageApi.success("Thêm feedback thành công");
        form.resetFields();
        setFile(null);
      } else {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(errorData);
        } else {
          const textError = await response.text();
          throw new Error(textError);
        }
      }
    } catch (error) {
      messageApi.error("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (info) => {
    const currentFile = info.file.originFileObj;
    setFile(currentFile);
  };
  const backHome = () => {
    navigate("/");
  };
  return (
    <>
      {contextHolder}
      <Button onClick={backHome}>Quay về trang chủ</Button>
      <div className="thank-you-header">
        <HeartFilled className="heart-icon" />
        <h1>Cảm ơn quý khách!</h1>
      </div>
      <div className="message-section">
        <p className="main-message">
          Chân thành cảm ơn quý khách đã tin tưởng và sử dụng dịch vụ đặt tour &
          mua cá Koi của chúng tôi
        </p>
        <p className="sub-message">
          Chúng tôi rất vui khi được đồng hành cùng quý khách trong hành trình
          khám phá vẻ đẹp của những chú cá Koi và những trải nghiệm du lịch
          tuyệt vời. Hy vọng quý khách đã có những khoảnh khắc đáng nhớ.
        </p>
      </div>
      <div className="feedback-form">
        <h2>Đánh giá trải nghiệm của bạn</h2>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="Rating"
            label="Đánh giá"
            rules={[{ required: true, message: "Vui lòng đánh giá" }]}
          >
            <Rate />
          </Form.Item>

          <Form.Item
            name="Content"
            label="Nội dung"
            rules={[
              { required: true, message: "Vui lòng nhập nội dung đánh giá" },
            ]}
          >
            <TextArea rows={4} placeholder="Chia sẻ trải nghiệm của bạn" />
          </Form.Item>

          <Form.Item
            label="Hình ảnh"
            name="image"
            rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
          >
            <Upload
              listType="picture-card"
              maxCount={1}
              onChange={handleChange}
            >
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={loading}
            >
              {loading ? "Đang gửi..." : "Gửi đánh giá"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default Feedback;
