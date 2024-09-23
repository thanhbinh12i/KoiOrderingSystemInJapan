import React, { useState } from "react";
import {
  Typography,
  Tabs,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
} from "antd";
const { Title } = Typography;
const { TabPane } = Tabs;

function MainContent() {
  const [isEdit, setIsEdit] = useState(false); // Manage edit mode
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "Nguyen Viet",
    gender: "male",
    birthdate: null,
    province: "Đăk Lăk",
    city: "Buôn Mê Thuột",
  });
  const [form] = Form.useForm();

  // Handle edit button click
  const handleEdit = () => {
    setIsEdit(true); // Enable edit mode
  };

  // Handle save button click
  const handleSave = () => {
    form.validateFields().then((values) => {
      setPersonalInfo(values); // Update personal information
      setIsEdit(false); // Exit edit mode after saving
    });
  };

  // Handle cancel button click
  const handleCancel = () => {
    setIsEdit(false); // Exit edit mode without saving
    form.resetFields(); // Reset form to original values
  };

  return (
    <div className="main-content">
      <Title level={2}>Cài đặt</Title>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Thông tin tài khoản" key="1">
          <Form form={form} layout="vertical" initialValues={personalInfo}>
            <Title level={4}>Dữ liệu cá nhân</Title>
            <Form.Item label="Tên đầy đủ" name="fullName">
              <Input placeholder="Nguyen Viet" disabled={!isEdit} />
            </Form.Item>
            <Form.Item label="Giới tính" name="gender">
              <Select placeholder="Chọn giới tính" disabled={!isEdit}>
                <Select.Option value="male">Nam</Select.Option>
                <Select.Option value="female">Nữ</Select.Option>
                <Select.Option value="other">Khác</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Ngày sinh" name="birthdate">
              <DatePicker style={{ width: "100%" }} disabled={!isEdit} />
            </Form.Item>
            <Form.Item label="Tỉnh thành" name="province">
              <Input placeholder="Nhập tỉnh thành" disabled={!isEdit} />
            </Form.Item>
            <Form.Item label="Thành phố" name="city">
              <Input placeholder="Nhập thành phố" disabled={!isEdit} />
            </Form.Item>

            {/* Save and Cancel buttons */}
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

          <div className="email-section">
            <Title level={4}>Email</Title>
            <p>Chỉ có thể sử dụng tối đa 3 email</p>
            <div className="email-item">
              <span>1. nptbinh17092004@gmail.com</span>
              <span className="email-status">Nơi nhận thông báo</span>
            </div>
            <Button icon="+" type="primary">
              Thêm email
            </Button>
          </div>

          <div className="phone-section">
            <Title level={4}>Phone</Title>
            <p>Chỉ có thể sử dụng tối đa 2 số điện thoại</p>
            <div className="phone-item">
              <span>1. 0977452762</span>
              <span className="phone-status">Nơi liên hệ</span>
            </div>
            <Button icon="+" type="primary">
              Thêm số điện thoại
            </Button>
          </div>
        </TabPane>

        <TabPane tab="Mật khẩu & Bảo mật" key="2">
          Nội dung cho Mật khẩu & Bảo mật
        </TabPane>
      </Tabs>
    </div>
  );
}

export default MainContent;
