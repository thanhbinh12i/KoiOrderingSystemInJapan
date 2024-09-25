import { Button, Card, Col, Form, Input, message, Row } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { login, loginGoogle } from "../../services/userServices";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/login";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
function Login() {
      const navigate = useNavigate();
      const [messageApi, contextHolder] = message.useMessage();
      const [loading, setLoading] = useState(false);
      const dispatch = useDispatch();
      const onFinish = async (values) => {
            setLoading(true);
            try {
                  const data = await login(values.email, values.password);
                  if (data) {
                        messageApi.success('Login successful');
                        const token = data.token;
                        const decodedToken = jwtDecode(token);
                        const userId = decodedToken.nameid;
                        localStorage.setItem('token', token);
                        localStorage.setItem('id', userId);

                        dispatch(checkLogin(true));
                        navigate("/");
                  }

            } catch (error) {
                  messageApi.error('Invalid user email or password');
            } finally {
                  setLoading(false);
            }
      }
      const handleGoogleLogin = async (credentialResponse) => {
            setLoading(true);
            try {
                  const data = await loginGoogle(credentialResponse.credential);
                  messageApi.success('Google login successful');
                  const token = data.token;
                  const decodedToken = jwtDecode(token);
                  const userId = decodedToken.nameid;
                  localStorage.setItem('token', token);
                  localStorage.setItem('id', userId);
                  dispatch(checkLogin(true));
                  navigate("/");

            } catch (error) {
                  messageApi.error('Google login failed');
            } finally {
                  setLoading(false);
            }
      };
      return (
            <>
                  {contextHolder}
                  <GoogleOAuthProvider clientId="660589619979-c0qacpa22156k4pcs7v3qvi34i99n9ma.apps.googleusercontent.com">
                        {contextHolder}
                        <div className="login">
                              <Row justify="center">
                                    <Col span={12}>
                                          <Card title="Đăng nhập" className="login__card">
                                                <Form onFinish={onFinish} layout="vertical">
                                                      <Form.Item label="Email" name="email">
                                                            <Input placeholder="Nhập địa chỉ Email" />
                                                      </Form.Item>
                                                      <Form.Item label="Mật khẩu" name="password">
                                                            <Input.Password placeholder="Nhập mật khẩu" />
                                                      </Form.Item>
                                                      <Form.Item>
                                                            <Button type="primary" size="large" htmlType="submit" className="login__button">
                                                                  Đăng nhập
                                                            </Button>
                                                      </Form.Item>
                                                      <GoogleLogin
                                                            onSuccess={handleGoogleLogin}
                                                            onError={() => {
                                                                  messageApi.error('Google login failed');
                                                            }}
                                                            render={(renderProps) => (
                                                                  <Button
                                                                        type="default"
                                                                        className="login__google"
                                                                        icon={<GoogleOutlined />}
                                                                        onClick={renderProps.onClick}
                                                                        disabled={renderProps.disabled}
                                                                        loading={loading}
                                                                  >
                                                                        Sign in with Google
                                                                  </Button>
                                                            )}
                                                      />
                                                </Form>
                                          </Card>
                                    </Col>
                              </Row>
                        </div>

                  </GoogleOAuthProvider>

            </>
      )
}
export default Login;
