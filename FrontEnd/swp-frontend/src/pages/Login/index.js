import { Button, Card, Col, Form, Input, message, Row } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../redux/actions/login";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { post } from "../../utils/request";
function Login() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    setLoading(true);
    const account = values.account;
    const password = values.password;
    try {
      const data = await post("account/login", { account, password });
      if (data) {
        const token = data.token;
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.nameid;
        localStorage.setItem("token", token);
        localStorage.setItem("id", userId);
        const role = decodedToken.role;
        localStorage.setItem("role", role);
        dispatch(checkLogin(true));

        if (role === "Manager") {
          navigate("/admin");
        } else if (role.includes("Staff")) {
          navigate("/staff/profile");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      messageApi.error("Sai tài khoản hoặc mật khẩu");
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleLogin = async (credentialResponse) => {
    setLoading(true);
    const values = credentialResponse.credential;
    try {
      const data = await post("account/google-login", { token: values });
      messageApi.success("Google login successful");
      const token = data.token;
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.nameid;
      localStorage.setItem("token", token);
      localStorage.setItem("id", userId);
      const role = decodedToken.role;
      localStorage.setItem("role", role);
      dispatch(checkLogin(true));

      if (role === "Manager") {
        navigate("/admin");
      } else if (role.includes("Staff")) {
        navigate("/staff/profile");
      } else {
        navigate("/");
      }
    } catch (error) {
      messageApi.error("Google login failed");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {contextHolder}
      <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
        {contextHolder}
        <div className="login">
          <Row justify="center">
            <Col span={12}>
              <Card title="Đăng nhập" className="login__card">
                <Form onFinish={onFinish} layout="vertical">
                  <Form.Item
                    label="Tài khoản"
                    name="account"
                    rules={[
                      { required: true, message: "Vui lòng nhập tài khoản!" },
                    ]}
                  >
                    <Input placeholder="Nhập tên người dùng hoặc email hoặc số điện thoại" />
                  </Form.Item>
                  <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[
                      { required: true, message: "Vui lòng nhập mật khẩu!" },
                    ]}
                  >
                    <Input.Password placeholder="Nhập mật khẩu" />
                  </Form.Item>
                  <div className="login__forgotPassword">
                    <Link to="/forgot-password">Quên mật khẩu</Link>
                  </div>
                  <Form.Item>
                    <Button
                      type="primary"
                      size="large"
                      htmlType="submit"
                      className="login__button"
                    >
                      Đăng nhập
                    </Button>
                  </Form.Item>
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => {
                      messageApi.error("Google login failed");
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
                <div className="login__register">
                  Bạn không có tài khoản? <Link to="/register">Đăng ký</Link>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </GoogleOAuthProvider>
    </>
  );
}
export default Login;
