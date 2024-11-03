import { Button, Card, Col, Form, Input, Row } from "antd";
import { get } from "../../utils/request";
import { useNavigate } from "react-router-dom";
function ConfirmEmail(){
      const navigate = useNavigate();
      const [form] = Form.useForm();
      const onFinish = async (values) => {
            const email = localStorage.getItem('email');
            const response = await get(`account/confirm-email?email=${email}&code=${values.code}`);
            if(response){
                  localStorage.removeItem('email');
                  navigate('/login');
            }
      }
      return (
            <>
             <Row justify="center">
                        <Col span={12}>
                              <Card title="Đặt lại mật khẩu" className="">
                                    <h4>Vui lòng xem mã OTP đã gửi qua mail của bạn.</h4>
                                    <Form onFinish={onFinish} layout="vertical" form={form}>
                                          <Form.Item label="Mã OTP" name="code">
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
                  </Row >
            </>
      )
}
export default ConfirmEmail;