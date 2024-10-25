import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  message,
  TimePicker,
  Row,
  Col,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { post } from "../../../utils/request";

function CreateKoiFarm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const handleFinish = async (values) => {
    try {
      setLoading(true);
      const formattedValues = {
        ...values,
        openHour: values.openHour.format("HH:mm"),
        closeHour: values.closeHour.format("HH:mm"),
      };
      const response = await post("koiFarm/create", formattedValues);

      if (response) {
        if (fileList.length > 0) {
          await uploadImages(response.farmId, fileList);
        }
        form.resetFields();
        setFileList([]);
        messageApi.success("Thêm trang trại koi mới thành công");
      } else {
        messageApi.error("Thêm trang trại mới không thành công");
      }
    } catch (error) {
      messageApi.error("Lỗi khi thêm trang trại koi mới");
    } finally {
      setLoading(false);
    }
  };

  const uploadImages = async (farmId, files) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file.originFileObj);
    });

    try {
      const response = await fetch(
        `https://koidayne.azurewebsites.net/api/farmImage/upload/${farmId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Lỗi tải lên hình ảnh");
      }

      const data = await response.json();
      messageApi.success("Tải lên hình ảnh thành công");
      return data.urls;
    } catch (error) {
      console.error("Error uploading images:", error);
      messageApi.error("Lỗi tải lên hình ảnh");
      throw error;
    }
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <>
      {contextHolder}
      <h1>Thêm trang trại cá Koi mới</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ rating: 5 }}
      >
        <Row gutter={20}>
          <Col span={24}>
            <Form.Item
              label="Tên trang trại"
              name="farmName"
              rules={[
                { required: true, message: "Vui lòng nhập tên trang trại!" },
              ]}
            >
              <Input placeholder="Nhập tên trang trại" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Giới thiệu"
              name="introduction"
              rules={[{ required: true, message: "Vui lòng nhập giới thiệu!" }]}
            >
              <Input.TextArea rows={4} placeholder="Nhập giới thiệu" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Địa chỉ"
              name="location"
              rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
            >
              <Input placeholder="Nhập địa chỉ" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Giờ mở cửa"
              name="openHour"
              rules={[{ required: true, message: "Vui lòng chọn giờ mở cửa!" }]}
            >
              <TimePicker format="HH:mm" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Giờ đóng cửa"
              name="closeHour"
              rules={[
                { required: true, message: "Vui lòng chọn giờ đóng cửa!" },
              ]}
            >
              <TimePicker format="HH:mm" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
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
          </Col>
          <Col span={12}>
            <Form.Item
              label="Số điện thoại"
              name="hotline"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
              ]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Hình ảnh trang trại" name="farmImage">
              <Upload
                listType="picture"
                fileList={fileList}
                onChange={handleFileChange}
                beforeUpload={() => false}
                multiple
              >
                <Button icon={<UploadOutlined />}>Tải lên hình ảnh</Button>
              </Upload>
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

export default CreateKoiFarm;
