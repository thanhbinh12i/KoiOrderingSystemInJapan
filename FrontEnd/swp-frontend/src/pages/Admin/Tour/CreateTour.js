import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  message,
  DatePicker,
  Row,
  Col,
  InputNumber,
} from "antd";
import { post } from "../../../utils/request";

function CreateTour() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleFinish = async (values) => {
    try {
      setLoading(true);
      const formattedValues = {
        ...values,
        startTime: values.startTime.format("YYYY-MM-DD"),
        finishTime: values.finishTime.format("YYYY-MM-DD"),
      };
      const response = await post("tour/create", formattedValues);

      if (response) {
        form.resetFields();
        messageApi.success("Thêm tour mới thành công");
      } else {
        messageApi.error("Thêm tour mới không thành công");
      }
    } catch (error) {
      messageApi.error("Lỗi khi thêm tour mới: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <h1>Thêm tour mới</h1>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Row gutter={20}>
          <Col span={24}>
            <Form.Item
              label="Tên tour"
              name="tourName"
              rules={[{ required: true, message: "Vui lòng nhập tên tour!" }]}
            >
              <Input placeholder="Nhập tên tour" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Giá (nghìn VND)"
              name="price"
              rules={[{ required: true, message: "Vui lòng nhập giá tour!" }]}
            >
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                placeholder="Nhập giá tour"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Ngày bắt đầu"
              name="startTime"
              rules={[
                { required: true, message: "Vui lòng chọn ngày bắt đầu!" },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Ngày kết thúc"
              name="finishTime"
              rules={[
                { required: true, message: "Vui lòng chọn ngày kết thúc!" },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Số người tham gia"
              name="numberOfParticipate"
              rules={[
                { required: true, message: "Vui lòng nhập số người tham gia" },
              ]}
            >
              <Input
                min={0}
                style={{ width: "100%" }}
                placeholder="Nhập số người tham gia"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Tạo mới
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default CreateTour;
