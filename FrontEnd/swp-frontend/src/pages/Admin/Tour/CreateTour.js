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
  Select,
} from "antd";
import { post, get } from "../../../utils/request";

function CreateTour() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [farms, setFarms] = useState([]);

  const handleFinish = async (values) => {
    try {
      setLoading(true);
      const { farmId } = values;
      const formattedValues = {
        ...values,
        startTime: values.startTime.format("YYYY-MM-DD"),
        finishTime: values.finishTime.format("YYYY-MM-DD"),
      };
      const tourResponse = await post("tour/create", formattedValues);

      if (tourResponse) {
        const tourId = tourResponse.tourId;

        if (Array.isArray(farmId) && farmId.length > 0) {
          const farmPromises = farmId.map((farmId) =>
            post(`tourDestination/create/${farmId}&${tourId}`, {
              tourDestination: tourId,
              type: "default",
            })
          );
          await Promise.all(farmPromises);

          const updatedTourData = await get(`tour/view/${tourId}`);
          if (updatedTourData) {
            console.log("Updated tour data:", updatedTourData);
          }
        }

        form.resetFields();
        messageApi.success("Thêm tour mới thành công");
      } else {
        messageApi.error("Thêm tour mới không thành công");
      }
    } catch (error) {
      console.log(error);
      messageApi.error("Lỗi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchFarms = async () => {
      const response = await get("koiFarm/view-all");
      if (response) {
        const formattedFarms = response.map((item) => ({
          label: item.farmName,
          value: item.farmId,
        }));
        setFarms(formattedFarms);
      }
    };
    fetchFarms();
  }, []);

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
          <Col span={12}>
            <Form.Item
              label="Trang tại trong chuyến đi"
              name="farmId"
              rules={[{ required: true, message: "Vui lòng chọn trang trại!" }]}
            >
              <Select mode="multiple" options={farms} />
            </Form.Item>
          </Col>
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
