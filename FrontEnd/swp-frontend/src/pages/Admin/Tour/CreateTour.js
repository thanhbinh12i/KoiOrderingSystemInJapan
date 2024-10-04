import React, { useState } from "react";
import { Modal, Form, Input, Button, message, DatePicker } from "antd";
import { post } from "../../../utils/request";

function CreateTour({ isModalVisible, handleOk, handleCancel }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const formattedValues = {
        ...values,
        startTime: values.startTime
          ? values.startTime.format("YYYY-MM-DD")
          : null,
        finishTime: values.finishTime
          ? values.finishTime.format("YYYY-MM-DD")
          : null,
      };
      const response = await post("tour/create", formattedValues);
      if (response) {
        form.resetFields();
        handleOk();
        messageApi.success("Thêm tour mới thành công");
      } else {
        messageApi.error("Thêm tour không thành công");
      }
    } catch (error) {
      messageApi.error("Lỗi: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Thêm tour mới"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Tên tour"
            name="tourName"
            rules={[{ required: true, message: "Vui lòng nhập tên tour!" }]}
          >
            <Input placeholder="Nhập tên tour" />
          </Form.Item>
          <Form.Item
            label="Giá ( nghìn VND)"
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập giá tour!" }]}
          >
            <Input type="number" placeholder="Nhập giá tour" />
          </Form.Item>
          <Form.Item
            label="Ngày bắt đầu"
            name="startTime"
            rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu!" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Ngày kết thúc"
            name="finishTime"
            rules={[
              { required: true, message: "Vui lòng chọn ngày kết thúc!" },
            ]}
          >
            <DatePicker />
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

export default CreateTour;
