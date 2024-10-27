import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./ChangePasswordForm.scss";
function ChangePasswordForm() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form submitted:", values);
  };

  return (
    <div className="change-password-container">
      <div className="change-password-content">
        <div className="user-avatar">
          <UserOutlined />
        </div>
        <h1>Change a password</h1>

        <Form
          form={form}
          name="change_password"
          onFinish={onFinish}
          layout="vertical"
          className="change-password-form"
        >
          <Form.Item
            name="username"
            initialValue="Victor"
            className="username-field"
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="oldPassword"
            rules={[
              {
                required: true,
                message: "Please input your old password!",
              },
            ]}
          >
            <Input.Password
              placeholder="Old password"
              prefix={<LockOutlined />}
            />
          </Form.Item>

          <Form.Item
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Please input your new password!",
              },
            ]}
          >
            <Input.Password
              placeholder="New password"
              prefix={<LockOutlined />}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confirm password"
              prefix={<LockOutlined />}
              suffix={
                <Button type="link" className="submit-arrow">
                  →
                </Button>
              }
            />
          </Form.Item>

          <div className="form-footer">
            <a href="#" className="reset-link">
              Create a password reset disk
            </a>
            <Button type="default" className="cancel-button">
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ChangePasswordForm;
