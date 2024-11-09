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
import moment from "moment";

function CreateTour() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [farms, setFarms] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const disableStartDates = (current) => {
    return current && current < moment().add(10, 'days').startOf("day");
  };
  const disableEndDate = (current) => {
    if (!startDate) return true;
    const sevenDaysLater = moment().add(10, 'days').startOf("day");
    return current && (current <= sevenDaysLater || current.valueOf() <= startDate.valueOf());
  };

  useEffect(() => {
    if (startDate) {
      form.setFieldValue('finishTime', null);
      setEndDate(null);
    }
  }, [form, startDate]);
  const handleFinish = async (values) => {
    try {
      setLoading(true);

      const allTour = await get("tour/view-all");
      const isDuplicate = allTour.some((tour) => values.tourName.trim() === tour.tourName);
      if (isDuplicate) {
        messageApi.error("Đã tồn tại tour. Yêu cập nhập lại tên mới.");
        return;
      }
      const { farmId } = values;
      const formattedValues = {
        ...values,
        startTime: values.startTime.format("DD-MM-YYYY"),
        finishTime: values.finishTime.format("DD-MM-YYYY"),
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
      <Form form={form} layout="vertical" onFinish={handleFinish} >
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
              rules={[{ required: true, message: "Vui lòng nhập giá tour!" },
              {
                required: true,
                pattern: /^[1-9]\d*$/,
                message: 'Giá chuyến đi phải lớn hơn 0'
              }
              ]}
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
              <DatePicker
                style={{ width: "100%" }}
                format="DD-MM-YYYY"
                disabledDate={disableStartDates}
                onChange={(date) => setStartDate(date)}
              />
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
              <DatePicker
                style={{ width: "100%" }}
                format="DD-MM-YYYY"
                disabledDate={disableEndDate}
                onChange={(date) => setEndDate(date)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Số người tham gia"
              name="numberOfParticipate"
              rules={[
                { required: true, message: "Vui lòng nhập số người tham gia" },
                {
                  pattern: /^[1-9]\d*$/,
                  message: 'Số lượng người trong chuyến đi phải lớn hơn 0'
                }
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
