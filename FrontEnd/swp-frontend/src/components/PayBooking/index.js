import { Form, Input, Button, Card, Row, Col, Typography, message, Statistic } from 'antd';
import { CreditCardOutlined, LockOutlined } from '@ant-design/icons';
import { useLocation, useParams } from 'react-router-dom';
import { post } from '../../utils/request';

const { Title } = Typography;

function PayBooking() {
      const location = useLocation();
      const { price } = location.state || { price: 0 };;
      const params = useParams();
      const userId = localStorage.getItem("id");
      const [messageApi, contextHolder] = message.useMessage();
      const onFinish = async (values) => {
            const updatedValues = { ...values, price };
            const response = await post(`bill/create/${userId}-${params.id}`, updatedValues);
            if (response) {
                  messageApi.success("Thanh toán thành công");
            }
      }
      return (
            <>
                  {contextHolder}
                  <div className="payment-page">
                        <Row justify="center" align="middle">
                              <Col xs={24} sm={20} md={16} lg={12} xl={8}>
                                    <Card className="payment-card">
                                          <Title level={2} className="payment-title">
                                                <CreditCardOutlined /> Thanh toán
                                          </Title>
                                          <Form
                                                name="payment_form"
                                                onFinish={onFinish}
                                                layout="vertical"
                                                initialValues={ price }
                                          >
                                                <Form.Item
                                                      name="userFullName"
                                                      label="Họ và tên"
                                                      rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                                                >
                                                      <Input size="large" placeholder="Nguyễn Văn A" />
                                                </Form.Item>
                                                <Form.Item
                                                      name="phoneNumber"
                                                      label="Số điện thoại"
                                                      rules={[{ required: true, message: 'Vui lòng số điện thoại!' }]}
                                                >
                                                      <Input size="large" placeholder="0xxxxxxxxxx" />
                                                </Form.Item>
                                                <Form.Item
                                                      name="Email"
                                                      label="email"
                                                      rules={[{ required: true, message: 'Vui lòng email!' }]}
                                                >
                                                      <Input size="large" placeholder="abc@gmail.com" />
                                                </Form.Item>
                                                <Form.Item
                                                      name="price"
                                                      label="Số tiền"
                                                      initialValue={price}
                                                >
                                                      <Input value={price} disabled />
                                                </Form.Item>
                                                <Form.Item>
                                                      <Button type="primary" htmlType="submit" size="large" block icon={<LockOutlined />}>
                                                            Thanh toán an toàn
                                                      </Button>
                                                </Form.Item>
                                          </Form>
                                    </Card>
                              </Col>
                        </Row>
                  </div>
            </>
      )
}
export default PayBooking;