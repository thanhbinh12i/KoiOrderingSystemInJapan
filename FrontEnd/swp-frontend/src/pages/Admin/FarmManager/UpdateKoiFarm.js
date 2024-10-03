import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, message, TimePicker, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { put } from "../../../utils/request";

function UpdateKoiFarm({ reload, record }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (record) {
      const formattedRecord = {
        ...record,
        openHour: record.openHour ? moment(record.openHour, "HH:mm") : null,
        closeHour: record.closeHour ? moment(record.closeHour, "HH:mm") : null,
      };
      form.setFieldsValue(formattedRecord);
    }
  }, [record, form]);

  const showModal = () => {
    setVisible(true);
  };

  const handleModalOk = async (values) => {
    try {
      setLoading(true);
      const updatedValues = {
        ...values,
        openHour: values.openHour ? values.openHour.format("HH:mm") : "",
        closeHour: values.closeHour ? values.closeHour.format("HH:mm") : "",
      };

      const response = await put(
        `koiFarm/update/${record.farmId}`,
        updatedValues
      );
      if (response) {
        messageApi.success("Cập nhật trang trại cá Koi thành công");
        setVisible(false);
        reload();
      } else {
        messageApi.error(
          response?.message || "Cập nhật trang trại cá Koi không thành công"
        );
      }
    } catch (error) {
      console.error("Error updating koi farm:", error);
      messageApi.error(
        "Lỗi khi cập nhật trang trại cá Koi: " +
          (error.message || "Đã xảy ra lỗi không xác định")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleModalCancel = () => {
    setVisible(false);
  };

  return (
    <>
      {contextHolder}
      <Tooltip title="Cập nhật">
        <Button type="link" icon={<EditOutlined />} onClick={showModal} />
      </Tooltip>
      <Modal
        title="Cập nhật trang trại cá Koi"
        visible={visible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleModalOk}>
          <Form.Item
            label="Tên trang trại"
            name="farmName"
            rules={[
              { required: true, message: "Vui lòng nhập tên trang trại!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giới thiệu"
            name="introduction"
            rules={[{ required: true, message: "Vui lòng nhập giới thiệu!" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="location"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          >
            <Input />
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
            <Input type="number" min={0} max={5} step={0.1} />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="hotline"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default UpdateKoiFarm;
