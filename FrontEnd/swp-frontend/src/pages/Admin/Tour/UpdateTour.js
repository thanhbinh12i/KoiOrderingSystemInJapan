import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, DatePicker, Row, Col } from "antd";
import moment from "moment";
import { put, get } from "../../../utils/request";
import { useParams } from "react-router-dom";
import GoBack from "../../../components/GoBack";

function UpdateTour() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const disablePastDates = (current) => {
    return current && current < moment().startOf('day');
  };
  useEffect(() => {
    const fetchTour = async () => {
      try {
        const tour = await get(`tour/view-tourId/${id}`);
        const formattedTour = {
          ...tour,
          startTime: tour.startTime ? moment(tour.startTime, "DD-MM-YYYY") : null,
          finishTime: tour.finishTime ? moment(tour.finishTime, "DD-MM-YYYY") : null,
        };
        form.setFieldsValue(formattedTour);
      } catch (error) {
        console.error("Error fetching tour:", error);
        messageApi.error("Không thể tải thông tin tour.");
      }
    };
    fetchTour();
  }, [id, form, messageApi]);

  const handleFormSubmit = async (values) => {
    try {
      setLoading(true);
      const updatedValues = {
        ...values,
        startTime: values.startTime
          ? values.startTime.format("DD-MM-YYYY")
          : "",
        finishTime: values.finishTime
          ? values.finishTime.format("DD-MM-YYYY")
          : "",
      };

      const response = await put(`tour/update/${id}`, updatedValues);
      if (response) {
        messageApi.success("Cập nhật tour thành công");
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
    <>
      <div>
        {contextHolder}
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Tên tour"
                name="tourName"
                rules={[{ required: true, message: "Vui lòng nhập tên tour!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Giá (nghìn VND)"
                name="price"
                rules={[{ required: true, message: "Vui lòng nhập giá tour!" }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Ngày bắt đầu"
                name="startTime"
                rules={[
                  { required: true, message: "Vui lòng chọn ngày bắt đầu!" },
                ]}
              >
                <DatePicker style={{ width: "100%" }} format="DD-MM-YYYY" disabledDate={disablePastDates}/>
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
                <DatePicker style={{ width: "100%" }} format="DD-MM-YYYY" disabledDate={disablePastDates}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Số người tham gia"
                name="numberOfParticipate"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn số lượng người có thể tham gia!",
                  },
                ]}
              >
                <Input
                  min={0}
                  style={{ width: "100%" }}
                  placeholder="Nhập số người tham gia"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Cập nhật
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div>
        <GoBack />
      </div>
    </>
  );
}

export default UpdateTour;
