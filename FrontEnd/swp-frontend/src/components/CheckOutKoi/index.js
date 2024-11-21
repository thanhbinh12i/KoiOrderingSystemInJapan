import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Col, List, Row, Typography, Button, Divider, Select, Input, Form } from "antd";
import GoBack from "../GoBack";
import { get, post } from "../../utils/request";
import './CheckOutKoi.scss';

const { Title, Text } = Typography;

const { Option } = Select;

function CheckOutKoi() {
      const params = useParams();
      const [form] = Form.useForm();
      const [koiBill, setKoiBill] = useState([]);
      const [delivery, setDelivery] = useState([]);
      const [selectedDeliveryFee, setSelectedDeliveryFee] = useState(0);
      const [selectedDeliveryId, setSelectedDeliveryId] = useState(null);
      const [totalPrice, setTotalPrice] = useState(0);
      const [deposit, setDeposit] = useState(0);
      useEffect(() => {
            const fetchApi = async () => {
                  const response = await get(`koi-bill/view-by-billId/${params.id}`);
                  if (response) {
                        setKoiBill(response);
                  }
            }
            fetchApi();
      }, [params.id]);
      const handlePay = async () => {
            const values = await form.validateFields();
            const price = deposit + selectedDeliveryFee;
            try {
                  const paymentData = {
                        orderType: "Thanh toán ngân hàng",
                        amount: price / 100,
                        orderDescription: `Thanh toán cho đơn hàng ${params.id}`,
                        name: "User",
                        quotationId: params.id
                  };
                  const paymentResponse = await post('payment', paymentData);

                  if (paymentResponse) {
                        const data = {
                              deliveryFee: selectedDeliveryFee,
                              totalPrice: totalPrice,
                              deposit: deposit,
                              id: params.id,
                              deliveryId: selectedDeliveryId,
                              deliveryAddress: values.address
                        }
                        localStorage.setItem('pendingPaymentKoi', JSON.stringify(data));
                        window.location.href = paymentResponse;
                  }
            } catch (error) {
                  console.error('Lỗi khi xử lý thanh toán VNPay:', error);
            }
      }
      useEffect(() => {
            const itemsTotal = koiBill.reduce((sum, item) => sum + item.finalPrice * item.quantity, 0);
            setDeposit(itemsTotal * 0.2);
            setTotalPrice(itemsTotal);
      }, [koiBill, selectedDeliveryFee]);
      useEffect(() => {
            const fetchApi = async () => {
                  const response = await get(`delivery/view-all`);
                  if (response) {
                        setDelivery(response);
                  }
            }
            fetchApi();
      }, [])
      const handleChange = (value, option) => {
            setSelectedDeliveryFee(value);
            setSelectedDeliveryId(option.key);
      }
      return (
            <>
                  <GoBack />
                  <Row gutter={24} className="shopping-cart-container">
                        <Col span={12} className="cart-container">
                              <Title level={3} className="payment-title">Giỏ hàng</Title>
                              <Card title="Danh sách koi đã đặt" className="shopping-cart-card">
                                    <List
                                          dataSource={koiBill}
                                          renderItem={(item) => (
                                                <List.Item className="shopping-cart-item">
                                                      <div className="item-details">Koi {item.koiName}</div>
                                                      <div className="item-quantity">Số lượng: {item.quantity}</div>
                                                      <div className="item-price">{item.finalPrice.toLocaleString()} đ</div>
                                                </List.Item>
                                          )}
                                    />

                                    <Divider />
                                    <div className="total-price">
                                          <h2>Tổng tiền: {totalPrice.toLocaleString()} đ</h2>
                                    </div>
                              </Card>
                        </Col>

                        <Col span={10} className="payment-info">
                              <Title level={3} className="payment-title">Thông tin thanh toán</Title>

                              <Form
                                    form={form}
                                    layout="vertical"
                                    onFinish={handlePay}
                                    className="payment-form"
                              >
                                    <Form.Item
                                          name="address"
                                          label="Địa chỉ"
                                          rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' },
                                          {
                                                validator: (_, value) => {
                                                      if (!/[a-zA-Z]/.test(value) || /^-?\d+$/.test(value)) {
                                                            return Promise.reject('Địa chỉ phải có ít nhất một chữ cái và không chỉ là số!');
                                                      }
                                                      return Promise.resolve();
                                                }
                                          }
                                          ]}
                                    >
                                          <Input placeholder="Nhập địa chỉ của bạn" />
                                    </Form.Item>

                                    <Form.Item
                                          label="Chọn dịch vụ giao hàng"
                                          name="deliveryService"
                                          rules={[{ required: true, message: 'Vui lòng chọn dịch vụ giao hàng' }

                                          ]}
                                          className="required-field"
                                    >
                                          <Select onChange={handleChange} style={{ width: '100%' }} placeholder="Chọn dịch vụ">
                                                {delivery.map((item) => (
                                                      <Option key={item.deliveryId} value={item.deliveryFee}>
                                                            {item.deliveryType} - {item.deliveryFee.toLocaleString()} đ
                                                      </Option>
                                                ))}
                                          </Select>
                                    </Form.Item>


                                    <div className="shipping-fee">
                                          <Text strong>Phí vận chuyển: </Text>
                                          <Text>{selectedDeliveryFee.toLocaleString()} đ</Text>
                                    </div>

                                    <div className="deposit-fee">
                                          <Text strong>Tiền đặt cọc (20%): </Text>
                                          <Text>{deposit.toLocaleString()} VND</Text>
                                    </div>

                                    <Divider />

                                    <div className="final-total">
                                          <Text strong>Tổng tiền thanh toán: </Text>
                                          <Text>{(deposit + selectedDeliveryFee).toLocaleString()} VND</Text>
                                    </div>

                                    <Button type="primary" htmlType="submit" block className="pay-button">
                                          Thanh toán ngay
                                    </Button>
                              </Form>
                        </Col>
                  </Row>
            </>
      );
}
export default CheckOutKoi;