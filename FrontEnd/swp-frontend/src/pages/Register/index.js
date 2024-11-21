import { Button, Card, Col, DatePicker, Form, Input, message, Row, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { get, post } from "../../utils/request";
import "./Register.scss"
const { Option } = Select;

function Register() {
      const navigate = useNavigate();
      const [form] = Form.useForm();
      const [messageApi, contextHolder] = message.useMessage();
      const onFinish = async (values) => {
            const { password, confirmPassword } = values;

            if (password !== confirmPassword) {
                  messageApi.error('Mật khẩu không khớp!');
                  return;
            }
            const data = {
                  ...values,
                  dateOfBirth: values.dateOfBirth.format("DD-MM-YYYY")
            }

            try {
                  const response = await post("account/register", data);
                  if (response) {
                        localStorage.setItem('email', values.email);
                        form.resetFields();
                        messageApi.success('Đăng ký thành công!');
                        navigate("/confirm-email");
                  }


            } catch (error) {
                  messageApi.error('Đăng ký thất bại, vui lòng thử lại.');
            }
      }
      const validatePassword = (_, value) => {
            if (!value) {
                  return Promise.reject('Vui lòng nhập mật khẩu!');
            }
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
            if (!regex.test(value)) {
                  return Promise.reject(
                        'Mật khẩu phải chứa ít nhất 12 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt!'
                  );
            }
            return Promise.resolve();
      };
      return (
            <>
                  {contextHolder}
                  <Row justify="center" className="registration-container">
                        <Col span={12}>
                              <Card title="Đăng ký tài khoản" className="registration-card">
                                    <Form onFinish={onFinish} layout="vertical" form={form}>
                                          <Form.Item
                                                label="User Name"
                                                name="userName"
                                                rules={[
                                                      { required: true, message: 'Vui lòng nhập User Name!' },
                                                      {
                                                            validator: async (_, value) => {
                                                                  if (value) {
                                                                        const existingUsers = await get("account/view-all-user");
                                                                        if (existingUsers.some(user => user.userName === value)) {
                                                                              throw new Error('Tên đăng nhập đã tồn tại!');
                                                                        }
                                                                  }
                                                            }
                                                      }
                                                ]}
                                          >
                                                <Input />
                                          </Form.Item>

                                          <Form.Item label="Họ và tên" name="fullName" rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}>
                                                <Input />
                                          </Form.Item>

                                          <Form.Item
                                                label="Email"
                                                name="email"
                                                rules={[
                                                      { type: 'email', message: 'Email không hợp lệ!' },
                                                      { required: true, message: 'Vui lòng nhập email!' },
                                                      {
                                                            validator: async (_, value) => {
                                                                  if (value) {
                                                                        const existingUsers = await get("account/view-all-user");
                                                                        if (existingUsers.some(user => user.email === value)) {
                                                                              throw new Error('Email đã tồn tại trong hệ thống!');
                                                                        }
                                                                  }
                                                            }
                                                      }
                                                ]}
                                          >
                                                <Input />
                                          </Form.Item>
                                          <Form.Item label="Số điện thoại" name="phoneNumber" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' },
                                          {
                                                pattern: /^0\d{9}$/,
                                                message: 'Số điện thoại không hợp lệ!'
                                          },
                                          {
                                                validator: async (_, value) => {
                                                      const normalizedPhone = value.replace(/\D/g, '');
                                                      const formattedPhone = `${normalizedPhone.slice(0, 4)}.${normalizedPhone.slice(4, 7)}.${normalizedPhone.slice(7, 10)}`;
                                                      if (value) {
                                                            const existingUsers = await get("account/view-all-user");
                                                            if (existingUsers.some(user => user.phoneNumber === formattedPhone)) {
                                                                  throw new Error('Số điện thoại đã tồn tại trong hệ thống!');
                                                            }
                                                      }
                                                }
                                          }
                                          ]}>
                                                <Input />
                                          </Form.Item>

                                          <Form.Item label="Địa chỉ" name="address" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' },
                                          {
                                                validator: (_, value) => {
                                                      if (!/[a-zA-Z]/.test(value) || /^-?\d+$/.test(value)) {
                                                            return Promise.reject('Địa chỉ phải có ít nhất một chữ cái và không chỉ là số!');
                                                      }
                                                      return Promise.resolve();
                                                }
                                          }
                                          ]}>
                                                <Input />
                                          </Form.Item>

                                          <Row gutter={16}>
                                                <Col span={12}>
                                                      <Form.Item label="Giới tính" name="gender" rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}>
                                                            <Select>
                                                                  <Option value="male">Nam</Option>
                                                                  <Option value="female">Nữ</Option>
                                                            </Select>
                                                      </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                      <Form.Item label="Ngày sinh" name="dateOfBirth" rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}>
                                                            <DatePicker format="DD-MM-YYYY" style={{ width: '100%' }} />
                                                      </Form.Item>
                                                </Col>
                                          </Row>

                                          <Row gutter={16}>
                                                <Col span={12}>
                                                      <Form.Item
                                                            label="Mật khẩu"
                                                            name="password"
                                                            rules={[
                                                                  { validator: validatePassword }
                                                            ]}
                                                      >
                                                            <Input.Password />
                                                      </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                      <Form.Item
                                                            label="Nhập lại mật khẩu"
                                                            name="confirmPassword"
                                                            dependencies={['password']}
                                                            rules={[
                                                                  { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
                                                                  ({ getFieldValue }) => ({
                                                                        validator(_, value) {
                                                                              if (!value || getFieldValue('password') === value) {
                                                                                    return Promise.resolve();
                                                                              }
                                                                              return Promise.reject('Mật khẩu không khớp!');
                                                                        },
                                                                  }),
                                                            ]}
                                                      >
                                                            <Input.Password />
                                                      </Form.Item>
                                                </Col>
                                          </Row>

                                          <Form.Item>
                                                <Button type="primary" htmlType="submit" className="submit-button">
                                                      Đăng ký
                                                </Button>
                                          </Form.Item>
                                    </Form>
                                    <div className="login-link">
                                          Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                                    </div>
                              </Card>
                        </Col>
                  </Row>
            </>
      );
}
export default Register;