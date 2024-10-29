import { Button, Card, Col, Form, Input, Row } from "antd";

function ResetPassword() {
      const [form] = Form.useForm();
      const onFinish = async (values) => {
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
                  <Row justify="center">
                        <Col span={12}>
                              <Card title="Đặt lại mật khẩu" className="">
                                    <Form onFinish={onFinish} layout="vertical" form={form}>
                                          <Form.Item label="Mật khẩu" name="password" rules={[{ validator: validatePassword }]}>
                                                <Input.Password />
                                          </Form.Item>
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
                                          <Form.Item>
                                                <Button type="primary" size="large" htmlType="submit" className="">
                                                      Gửi
                                                </Button>
                                          </Form.Item>
                                    </Form>

                              </Card>
                        </Col>
                  </Row >
            </>
      )
}
export default ResetPassword;