import { Button, Card, Col, Form, Input, Row } from "antd";
import { GoogleOutlined } from '@ant-design/icons';
import "./Login.scss"
import { useNavigate } from "react-router-dom";
function Login() {
      const navigate = useNavigate();
      const onFinish = async (values) => {
            console.log(values);
      }
      const handleGoogleLogin = () => {
            console.log("Signing in with Google");
          };
      return (
            <>
                  <div className="login">
                        <Row justify="center">
                              <Col span={12}>
                                    <Card title="Đăng nhập" className="login__card">
                                          <Form onFinish={onFinish} layout="vertical">
                                                <Form.Item label="Email" name="email">
                                                      <Input placeholder="Nhập địa chỉ Email"/>
                                                </Form.Item>
                                                <Form.Item label="Mật khẩu" name="password">
                                                      <Input.Password placeholder="Nhập mật khẩu" />
                                                </Form.Item>
                                                <Form.Item>
                                                      <Button type="primary" size="large" htmlType="submit" className="login__button">
                                                            Đăng nhập
                                                      </Button>
                                                </Form.Item>
                                                <Button type="default" className="login__google" icon={<GoogleOutlined />} onClick={handleGoogleLogin}>
                                                      Sign in with Google
                                                </Button>
                                          </Form>
                                    </Card>
                              </Col>
                        </Row>
                  </div>

            </>
      )
}
export default Login;