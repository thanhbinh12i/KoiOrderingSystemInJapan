import {
  DatePicker,
  Form,
  Input,
  Select,
  Row,
  Col,
  Button,
  message,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import moment from "moment";
import { useState } from "react";
import { post } from "../../../utils/request";
import { Option } from "antd/es/mentions";

function CreateStaff() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { role, ...staff } = values;
      const res = await post(`account/createStaff?role=${role}`, staff);
      message.success("Create staff successfully!");
      console.log(res);

      if (res) {
        form.resetFields();
        setReload(true);
      }
    } catch (error) {
      message.error("Fail to create staff");
    } finally {
      setLoading(false);
    }
  };
  const handleReload = () => {
    setReload(!reload);
  };
  return (
    <>
      <Form form={form} onFinish={onFinish}>
        <Row gutter={20}>
          <Col span={12}>
            <FormItem
              label="Tên nhân viên"
              name="userName"
              rules={[
                { required: true, message: "Vui lòng nhập tên nhân viên" },
              ]}
            >
              <Input />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email" },
                { type: "email", message: "Vui lòng nhập email hợp lệ!" },
              ]}
            >
              <Input />
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem
              label="Giới tính"
              name="gender"
              rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
            >
              <Select placeholder="Chọn giới tính">
                <Select.Option value="male">Nam</Select.Option>
                <Select.Option value="female">Nữ</Select.Option>
                <Select.Option value="other">Khác</Select.Option>
              </Select>
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem
              label="Họ và tên"
              name="fullName"
              rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
            >
              <Input />
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem
              label="Địa chỉ"
              name="address"
              rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
            >
              <Input />
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem
              label="Số điện thoại"
              name="phoneNumber"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" },
              ]}
            >
              <Input />
            </FormItem>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Ngày sinh"
              name="dateOfBirth"
              rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                format="YYYY-MM-DD"
                disabledDate={(current) =>
                  current && current > moment().endOf("day")
                }
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <FormItem
              label="Mật khẩu mặc định"
              name="password"
              initialValue="123456789Aa!"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
            >
              <Input.Password />
            </FormItem>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please select a role" }]}
            >
              <Select placeholder="Select a role">
                <Option value="DeliveringStaff">Delivering Staff</Option>
                <Option value="ConsultingStaff">Consulting Staff</Option>
                <Option value="SalesStaff">Sales Staff</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row justify="end">
          <Col span={24}>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                onClick={handleReload}
              >
                Tạo nhân viên
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default CreateStaff;
