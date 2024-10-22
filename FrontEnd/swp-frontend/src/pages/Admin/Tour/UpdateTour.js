import React, { useState } from "react";
import { Modal, Form, Input, Button, message, DatePicker, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { put } from "../../../utils/request";

function UpdateTour({ reload, record }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleModalOk = async (values) => {
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

      const response = await put(`tour/update/${record.tourId}`, updatedValues);
      if (response) {
        messageApi.success("Cập nhật tour thành công");
        setVisible(false);
        reload();
      } else {
        messageApi.error(response.message || "Cập nhật tour không thành công");
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

  const handleModalCancel = () => {
    setVisible(false);
  };
  const validateDates = (_, value) => {
    const startDate = form.getFieldValue('startTime');
    const endDate = form.getFieldValue('finishTime');

    if (startDate && endDate && moment(endDate).isSameOrBefore(startDate)) {
      return Promise.reject('Ngày kết thúc phải sau ngày bắt đầu!');
    }
    return Promise.resolve();
  };
  const disabledDate = (current) => {
    return current && current < moment().startOf('day');
  };


  return (
    <>
      {contextHolder}
      <Tooltip title="Cập nhật">
        <Button type="link" icon={<EditOutlined />} onClick={showModal} />
      </Tooltip>
      <Modal
        title="Cập nhật tour"
        visible={visible}
        onCancel={handleModalCancel}

        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleModalOk}
          initialValues={{
            ...record,
            startTime: record.startTime ? moment(record.startTime) : null,
            finishTime: record.finishTime ? moment(record.finishTime) : null,
          }}
        >
          <Form.Item
            label="Tên tour"
            name="tourName"
            rules={[{ required: true, message: "Vui lòng nhập tên tour!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giá (nghìn VND)"
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập giá tour!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Ngày bắt đầu"
            name="startTime"
            rules={[
              { required: true, message: "Vui lòng chọn ngày bắt đầu!" },
              { validator: validateDates }
            ]}
          >
            <DatePicker style={{ width: "100%" }} format="DD-MM-YYYY"
            disabledDate={disabledDate}
            picker="date" />
          </Form.Item>
          <Form.Item
            label="Ngày kết thúc"
            name="finishTime"
            rules={[
              { required: true, message: "Vui lòng chọn ngày kết thúc!" },
              { validator: validateDates }
            ]}
          >
            <DatePicker style={{ width: "100%" }} format="DD-MM-YYYY"
            disabledDate={disabledDate}
            picker="date"/>
          </Form.Item>
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
              placeholder="Nhập giá tour"
            />
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

export default UpdateTour;
