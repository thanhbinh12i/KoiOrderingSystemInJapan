import { Form, Input, Button, Card, Row, Col, Typography } from 'antd';
import { CreditCardOutlined } from '@ant-design/icons';
import { useLocation, useParams } from 'react-router-dom';
import { get, post} from '../../utils/request';
import { useEffect, useState } from 'react';

const { Title } = Typography;

function PayBooking() {
      const location = useLocation();
      const { price } = location.state || { price: 0 };;
      const params = useParams();
      const [quotation, setQuotation] = useState({});
      const [form] = Form.useForm();
      useEffect(() => {
            const fetchApi = async () => {
                  const response = await get(`quotation/view/${params.id}`);
                  if (response) {
                        setQuotation(response);
                  }
            }
            fetchApi();
      })
      // const onFinish = async (values) => {
      //       const getTimeCurrent = () => {
      //             return new Date().toLocaleString();
      //       };
      //       const updatedValues = { ...values, price };
      //       const response = await post(`bill/create/${userId}-${params.id}`, updatedValues);
      //       if (response) {
      //             const quotationData = {
      //                   ...quotation,
      //                   "status": "Đã thanh toán",
      //                   "approvedDate": getTimeCurrent(),
      //             };
      //             const responseUpdate = await put(`quotation/update/${params.id}`, quotationData);
      //             if (responseUpdate) {
      //                   window.location.href = `/pay-success/${response.billId}`;
      //             }
      //       }
      // }
      const onFinishVNPay = async (values) => {
            try {
                  const paymentData = {
                        orderType: "string", 
                        amount: price,
                        orderDescription: `Thanh toán cho đơn hàng ${params.id}`,
                        name: "Binh",
                        quotationId: params.id
                      };
                  const paymentResponse = await post('payment', paymentData);

                  if (paymentResponse) {
                        localStorage.setItem('pendingPaymentData', JSON.stringify({...values, price, quotationId: params.id}));
                        window.location.href = paymentResponse;
                      }
            } catch (error) {
                  console.error('Lỗi khi xử lý thanh toán VNPay:', error);
            }
      };
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
                                                layout="vertical"
                                                onFinish={onFinishVNPay}
                                                form={form}
                                          >
                                                <Form.Item
                                                      name="userFullName"
                                                      label="Họ và tên"
                                                      initialValue={quotation.fullName}
                                                      rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                                                >
                                                      <Input value={quotation.fullName} size="large" />
                                                </Form.Item>
                                                <Form.Item
                                                      name="phoneNumber"
                                                      label="Số điện thoại"
                                                      initialValue={quotation.phoneNumber}
                                                      rules={[{ required: true, message: 'Vui lòng số điện thoại!' }]}
                                                >
                                                      <Input value={quotation.phoneNumber} size="large" />
                                                </Form.Item>
                                                <Form.Item
                                                      name="Email"
                                                      label="email"
                                                      initialValue={quotation.email}
                                                      rules={[{ required: true, message: 'Vui lòng email!' }]}
                                                >
                                                      <Input value={quotation.email} size="large" />
                                                </Form.Item>
                                                <Form.Item
                                                      name="price"
                                                      label="Số tiền"
                                                      initialValue={price}
                                                >
                                                      <Input value={price} disabled />
                                                </Form.Item>
                                                <Form.Item>
                                                      <Button htmlType='submit' size="large" block icon={<CreditCardOutlined />}>
                                                            Thanh toán qua VNPay
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