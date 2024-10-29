import { Button, Card, Col, Form, Input, Row } from "antd";
import { get, post } from "../../utils/request";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
      const navigate = useNavigate();
      const [form] = Form.useForm();
      const onFinish = async (values) => {
            const response = await post("account/forgot-password", {toEmail: values.email});
            if (response) {
                  navigate("/");
            }
      }
      return (
            <>
                  <Row justify="center">
                        <Col span={12}>
                              <Card title="Quên mật khẩu" className="">
                                    <Form onFinish={onFinish} layout="vertical" form={form}>
                                          <Form.Item label="Nhập email của bạn" name="email" rules={[{ type: 'email', message: 'Email không hợp lệ!' }, { required: true, message: 'Vui lòng nhập email!' },
                                          {
                                                validator: async (_, value) => {
                                                      if (value) {
                                                            const existingUsers = await get("account/view-all-user");
                                                            if (!existingUsers.some(user => user.email === value)) {
                                                                  throw new Error('Email không tồn tại trong hệ thống!');
                                                            }
                                                      }
                                                }
                                          }
                                          ]}>
                                                <Input />
                                          </Form.Item>
                                          <Form.Item>
                                                <Button type="primary" size="large" htmlType="submit" className="">
                                                      Gửi
                                                </Button>
                                          </Form.Item>
                                    </Form>

                              </Card>
                        </Col>
                  </Row>
            </>
      )
}
export default ForgotPassword;