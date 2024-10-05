import React, { useState } from "react";
import { Modal, Form, Input, Button, message, TimePicker } from "antd";
import { post } from "../../../utils/request";

function CreateKoiFarm({ isModalVisible, handleOk, handleCancel }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const formattedValues = {
        ...values,
        openHour: values.openHour ? values.openHour.format("HH:mm") : null,
        closeHour: values.closeHour ? values.closeHour.format("HH:mm") : null,
      };
      const response = await post("koiFarm/create", formattedValues);
      if (response) {
        form.resetFields();
        handleOk();
        messageApi.success("Thêm trang trại cá Koi mới thành công");
      } else {
        messageApi.error("Thêm trang trại cá Koi không thành công");
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
        title="Thêm trang trại cá Koi mới"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ rating: 5 }}
        >
          <Form.Item
            label="Tên trang trại"
            name="farmName"
            rules={[
              { required: true, message: "Vui lòng nhập tên trang trại!" },
            ]}
          >
            <Input placeholder="Nhập tên trang trại" />
          </Form.Item>
          <Form.Item
            label="Giới thiệu"
            name="introduction"
            rules={[{ required: true, message: "Vui lòng nhập giới thiệu!" }]}
          >
            <Input.TextArea placeholder="Nhập giới thiệu" />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="location"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          >
            <Input placeholder="Nhập địa chỉ" />
          </Form.Item>
          <Form.Item
            label="Giờ mở cửa"
            name="openHour"
            rules={[{ required: true, message: "Vui lòng chọn giờ mở cửa!" }]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item>
          <Form.Item
            label="Giờ đóng cửa"
            name="closeHour"
            rules={[{ required: true, message: "Vui lòng chọn giờ đóng cửa!" }]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Vui lòng nhập email hợp lệ!" },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>
          <Form.Item
            label="Đánh giá"
            name="rating"
            rules={[{ required: true, message: "Vui lòng nhập đánh giá!" }]}
          >
            <Input
              type="number"
              min={0}
              max={5}
              step={0.1}
              placeholder="Nhập đánh giá"
            />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="hotline"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
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

export default CreateKoiFarm;
