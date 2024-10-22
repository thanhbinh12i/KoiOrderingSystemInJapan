import React, { useState } from "react";
import { Form, Input, Button, Rate, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./Feedback.scss";
import { post } from "../../utils/request";

const { TextArea } = Input;

const Feedback = () => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const userId = localStorage.getItem("id");
  console.log(userId);
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await post(`feedback/create/${userId}`, {
        rating: values.rating,
        urlImage: imageUrl,
        content: values.content,
      });
      console.log(response);
      if (response) {
        if (fileList.length > 0) {
          await uploadImages(response.farmId, fileList);
        }
        form.resetFields();
        setFileList([]);
        messageApi.success("Thêm feedback thành công");
      } else {
        throw new Error("No response from server");
      }
    } catch (error) {
      message.error("Failed to submit feedback. Please try again.");
      console.error("Error submitting feedback:", error);
    }
    setLoading(false);
  };

  const uploadImages = async (farmId, files) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file.originFileObj);
    });

    try {
      const response = await fetch(
        `https://localhost:7087/api/farmImage/upload/${farmId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Lỗi tải lên hình ảnh");
      }

      const data = await response.json();
      messageApi.success("Tải lên hình ảnh thành công");
      return data.urls;
    } catch (error) {
      console.error("Error uploading images:", error);
      messageApi.error("Lỗi tải lên hình ảnh");
      throw error;
    }
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <>
      {contextHolder}
      <div className="feedback-form">
        <h2>Your Feedback</h2>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="rating"
            label="Rating"
            rules={[{ required: true, message: "Please rate your experience" }]}
          >
            <Rate />
          </Form.Item>
          <Form.Item
            name="content"
            label="Comments"
            rules={[{ required: true, message: "Please enter your feedback" }]}
          >
            <TextArea rows={4} placeholder="Tell us about your experience" />
          </Form.Item>
          <Form.Item label="Hình ảnh trang trại" name="urlImage">
            <Upload
              listType="picture"
              fileList={fileList}
              onChange={handleFileChange}
              beforeUpload={() => false}
              multiple
            >
              <Button icon={<UploadOutlined />}>Tải lên hình ảnh</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit Feedback
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Feedback;
