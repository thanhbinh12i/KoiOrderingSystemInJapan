import { Form, Input, Button, Card, Row, Col, Typography} from 'antd';
import { CreditCardOutlined, LockOutlined } from '@ant-design/icons';
import { useLocation, useParams } from 'react-router-dom';
import { post, put } from '../../utils/request';

const { Title } = Typography;

function PayBooking() {
      const location = useLocation();
      const { price } = location.state || { price: 0 };;
      const params = useParams();
      const userId = localStorage.getItem("id");
      const onFinish = async (values) => {
            const getTimeCurrent = () => {
                  return new Date().toLocaleString();
            };
            const updatedValues = { ...values, price };
            const response = await post(`bill/create/${userId}-${params.id}`, updatedValues);
            if (response) {
                  const quotationData = {
                        "priceOffer": price,
                        "status": "Đã thanh toán",
                        "approvedDate": getTimeCurrent(),
                  };
                  const responseUpdate = await put(`quotation/update/${params.id}`, quotationData);
                  if (responseUpdate) {
                        window.location.href = `/pay-success/${response.billId}`;
                  }
            }
      }
      const ACCOUNT_NUMBER = '0905024174';
      const BANK_CODE = 'MB';
      const ACCOUNT_NAME = "Nguyen Pham Thanh Binh";
      const Description = "Thanh toán";
      const amount = 55000;

      const paymentInfo = `https://img.vietqr.io/image/${BANK_CODE}-${ACCOUNT_NUMBER}-compact.png?amount=${amount}&addInfo=${Description}&accountName=${ACCOUNT_NAME}`;

      return (
            <>
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
                                                initialValues={price}
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
                                                      <img src={paymentInfo} alt='' />
                                                </Form.Item>
                                                <Form.Item>
                                                      <Button type="primary" htmlType="submit" size="large" block icon={<LockOutlined />}>
                                                            Thanh toán
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