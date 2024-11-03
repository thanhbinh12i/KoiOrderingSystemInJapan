import { Modal, Form, Input, Button, message, Upload } from "antd";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { get } from "../../../utils/request";

const { TextArea } = Input;
function CreateVariety(props) {
  const { isModalVisible, handleOk, handleCancel } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [file, setFile] = useState(null);
  const handleSubmit = async (values) => {
    const allVarieties = await get("koi-variable/view-all");
    const isDuplicate = allVarieties.some(
      (variety) => variety.varietyName === values.VarietyName.trim()
    );
    if (isDuplicate) {
      messageApi.error("Tên giống cá đã tồn tại. Vui lòng nhập tên khác!");
      return;
    }
    const formData = new FormData();
    formData.append("files", file);
    formData.append("VarietyName", values.VarietyName);
    formData.append("Description", values.Description);

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}koi-variable/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Lỗi tải lên hình ảnh");
      }
      const data = await response.json();

      if (data) {
        messageApi.success("Tạo giống cá mới thành công");
        form.resetFields();
        setFile(null);
        setLoading(false);
        handleOk();
      } else {
        throw new Error("Lỗi tạo giống cá mới");
      }
    } catch (error) {
      message.error("Error creating variety: " + error.message);
    }
  };

  const handleChange = (info) => setFile(info.file.originFileObj);
  return (
    <>
      {contextHolder}
      <Modal
        title="Thêm giống cá mới"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Tên giống cá"
            name="VarietyName"
            rules={[{ required: true, message: "Vui lòng nhập tên giống cá!" }]}
          >
            <Input placeholder="Nhập tên giống cá" />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="Description"
            rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
          >
            <TextArea placeholder="Nhập mô tả" />
          </Form.Item>
          <Form.Item
            name="image"
            label="Ảnh"
            rules={[{ required: true, message: "Vui lòng chọn ảnh!" }]}
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
            <Button type="primary" htmlType="submit" loading={loading}>
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
export default CreateVariety;
