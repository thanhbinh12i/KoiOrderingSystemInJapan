import React, { useState, useEffect } from "react";
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
import moment from "moment";
import { put, get } from "../../../utils/request";
import { useParams, useNavigate } from "react-router-dom";

function UpdateTour() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const response = await get(`tour/view-tourId/${id}`);
        if (response) {
          const formattedRecord = {
            ...response,
            startTime: response.startTime ? moment(response.startTime) : null,
            finishTime: response.finishTime
              ? moment(response.finishTime)
              : null,
          };
          form.setFieldsValue(formattedRecord);
        }
      } catch (error) {
        console.error("Error fetching tour data:", error);
        messageApi.error("Failed to load tour data. Please try again.");
      }
    };

    fetchTourData();
  }, [id, form, messageApi]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const updatedValues = {
        ...values,
        startTime: values.startTime
          ? values.startTime.format("YYYY-MM-DD")
          : "",
        finishTime: values.finishTime
          ? values.finishTime.format("YYYY-MM-DD")
          : "",
      };

      const response = await put(`tour/update/${id}`, updatedValues);
      if (response) {
        messageApi.success("Cập nhật tour thành công");
        navigate("/tour-manager");
      } else {
        messageApi.error(response?.message || "Cập nhật tour không thành công");
      }
    } catch (error) {
      console.error("Error updating tour:", error);
      messageApi.error(
        "Lỗi khi cập nhật tour: " +
          (error.message || "Đã xảy ra lỗi không xác định")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {contextHolder}
      <h2>Cập nhật tour</h2>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
          <Col span={12}>
            <Form.Item
              label="Số người tham gia"
              name="numberOfParticipate"
              rules={[
                { required: true, message: "Vui lòng nhập số người tham gia" },
              ]}
            >
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                placeholder="Nhập số người tham gia"
              />
            </Form.Item>
          </Col>
          <Col span={12}></Col>
          <Col span={0}>
            <Form.Item
              label="Kiểu chuyến đi"
              name="type"
              value="default"
            ></Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Cập nhập
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default UpdateTour;
