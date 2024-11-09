import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./ChangePasswordForm.scss";
import { get, put } from "../../utils/request";

function ChangePasswordForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await get(`account/${userId}`);
        if (userData) {
          form.setFieldsValue({
            fullName: userData.fullName,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId, form]);

  const validatePassword = (_, value) => {
    if (!value) {
      return Promise.reject("Vui lòng nhập mật khẩu!");
    }
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    if (!regex.test(value)) {
      return Promise.reject(
        "Mật khẩu phải chứa ít nhất 12 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt!"
      );
    }
    return Promise.resolve();
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await put(`account/change-password/${userId}`, {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      });

      message.success("Đổi mật khẩu thành công!");
      form.resetFields(["oldPassword", "newPassword", "confirmPassword"]);
    } catch (error) {
      if (error.status === 400) {
        if (error.data === "Password is not correct!") {
          message.error("Mật khẩu cũ không chính xác!");
        } else if (error.data === "Two passwords are not match!") {
          message.error("Mật khẩu xác nhận không khớp với mật khẩu mới!");
        } else {
          message.error(error.data || "Đổi mật khẩu thất bại");
        }
      } else if (error.status === 404) {
        message.error("Không tìm thấy thông tin người dùng");
      } else {
        message.error("Đã có lỗi xảy ra, vui lòng thử lại sau");
      }
      console.error("Change password error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="change-password-container">
      <div className="change-password-content">
        <div className="user-avatar">
          <UserOutlined className="avatar-icon" />
        </div>
        <h1>Đổi mật khẩu</h1>

        <Form
          form={form}
          name="change_password"
          onFinish={onFinish}
          layout="vertical"
          className="change-password-form"
        >
          <Form.Item
            label="Tên người dùng"
            name="fullName"
            className="full-name-field"
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="oldPassword"
            label="Mật khẩu cũ"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu cũ!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Nhập mật khẩu cũ"
              style={{
                height: 50
              }}
            />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="Mật khẩu mới"
            rules={[{ validator: validatePassword }]}
          >
            <Input.Password
              placeholder="Nhập mật khẩu mới"
              prefix={<LockOutlined />}
              style={{
                height: 50
              }}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu xác nhận không khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Xác nhận mật khẩu mới"
              prefix={<LockOutlined />}
              style={{
                height: 50
              }}
            />
          </Form.Item>

          <Form.Item className="form-footer">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="submit-button"
            >
              Đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default ChangePasswordForm;
