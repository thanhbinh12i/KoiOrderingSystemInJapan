import React, { useState } from "react";
import { Form, Input, Button, Rate, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./Feedback.scss";

const { TextArea } = Input;

const Feedback = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const userId = localStorage.getItem("id");

  const onFinish = async (values) => {
    setLoading(true);
    const formData = new FormData();

    formData.append("files", files);

    formData.append("Rating", values.Rating);
    formData.append("Content", values.Content);
    try {
      const response = await fetch(
        `https://localhost:7087/api/feedback/create/${userId}`,
        {
          method: "POST",
          body: formData,
        }
      );
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          messageApi.success("Thêm feedback thành công");
          form.resetFields();
          setFiles(null);
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Lỗi khi gửi feedback");
      }
    } catch (error) {
      messageApi.error(error.message || "Có lỗi xảy ra, vui lòng thử lại");
      console.error("Error submitting feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (info) => {
    setFiles(info.file.originFileObj);
  };

  const beforeUpload = (file) => {
    const isImage = file.type?.startsWith("image/");
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isImage) {
      messageApi.error("Chỉ được upload file hình ảnh!");
      return false;
    }
    if (!isLt2M) {
      messageApi.error("Hình ảnh phải nhỏ hơn 2MB!");
      return false;
    }

    return false;
  };

  return (
    <>
      {contextHolder}
      <div className="feedback-form">
        <h2>Đánh giá của bạn</h2>
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          encType="multipart/form-data"
        >
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
              beforeUpload={beforeUpload}
              onChange={handleChange}
              accept="image/*"
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
};

export default Feedback;
