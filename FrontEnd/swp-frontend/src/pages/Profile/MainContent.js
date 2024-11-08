import React, { useState, useEffect } from "react";
import {
  Typography,
  Tabs,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  message,
} from "antd";
import { get, put } from "../../utils/request";
import moment from "moment";
const { Title } = Typography;
const { TabPane } = Tabs;

function MainContent() {
  const [isEdit, setIsEdit] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({});
  const userId = localStorage.getItem("id");

  const [form] = Form.useForm();

  const fetchPersonalInfo = async () => {
    try {
      const response = await get(`account/${userId}`);
      const updatedInfo = {
        ...response,
        dateOfBirth: response.dateOfBirth
          ? moment(response.dateOfBirth, "DD-MM-YYYY")
          : null,
      };
      setPersonalInfo(updatedInfo);
      form.setFieldsValue(updatedInfo);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchPersonalInfo();
    // eslint-disable-next-line
  }, []);

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      const response = await put(`account/update/${userId}`, {
        ...values,
        dateOfBirth: values.dateOfBirth
          ? values.dateOfBirth.format("DD-MM-YYYY")
          : null,
      });

      message.success("Cập nhật thành công!");
      setPersonalInfo(response);
      setIsEdit(false);
    } catch (error) {
      message.error("Có lỗi xảy ra khi cập nhật thông tin.");
      console.error("Error:", error);
    }
  };

  const handleCancel = () => {
    setIsEdit(false);
    form.resetFields();
  };

  return (
    <div className="main-content">
      <Title level={2}>Cài đặt</Title>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Thông tin tài khoản" key="1">
          <Form form={form} layout="vertical" initialValues={personalInfo}>
            <Title level={4}>Dữ liệu cá nhân</Title>
            <Form.Item label="Tên đầy đủ" name="fullName" rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}>
              <Input placeholder="Full Name" disabled={!isEdit}/>
            </Form.Item>
            <Form.Item label="Giới tính" name="gender">
              <Select placeholder="Chọn giới tính" disabled={!isEdit}>
                <Select.Option value="male">Nam</Select.Option>
                <Select.Option value="female">Nữ</Select.Option>
                <Select.Option value="other">Khác</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Ngày sinh" name="dateOfBirth">
              <DatePicker
                style={{ width: "100%" }}
                disabled={!isEdit}
                format="DD-MM-YYYY"
              />
            </Form.Item>
            <Form.Item label="Địa chỉ" name="address" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}>
              <Input placeholder="Nhập thành phố" disabled={!isEdit} />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ type: 'email', message: 'Email không hợp lệ!' }]}>
              <Input disabled />
            </Form.Item>
            <Form.Item label="Số điện thoại" name="phoneNumber" rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại!" },
                  {
                    pattern: /^0\d{9}$/,
                    message: "Số điện thoại không hợp lệ!",
                  },
                ]}>
              <Input
                placeholder="Nhập số điện thoại"
                disabled={!isEdit}
              />
            </Form.Item>

            {isEdit ? (
              <Form.Item>
                <Button type="primary" onClick={handleSave}>
                  Lưu
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={handleCancel}>
                  Hủy
                </Button>
              </Form.Item>
            ) : (
              <Button type="primary" onClick={handleEdit}>
                Cập nhật
              </Button>
            )}
          </Form>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default MainContent;
