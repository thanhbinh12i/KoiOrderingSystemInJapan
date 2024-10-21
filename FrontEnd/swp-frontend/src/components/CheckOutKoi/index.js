import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Col, List, Row, Typography, Button, Divider, Select, Input, Form } from "antd";
import GoBack from "../GoBack";
import { get, post } from "../../utils/request";

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
                        amount: price,
                        orderDescription: `Thanh toán cho đơn hàng ${params.id}`,
                        name: "User",
                        quotationId: params.id
                  };
                  const paymentResponse = await post('payment', paymentData);

                  if (paymentResponse) {
                        localStorage.setItem('pendingPaymentKoi', JSON.stringify({ totalPrice: totalPrice + selectedDeliveryFee, price, id: params.id, deliveryId: selectedDeliveryId, deliveryAddress: values.address }));
                        window.location.href = paymentResponse;
                  }
            } catch (error) {
                  console.error('Lỗi khi xử lý thanh toán VNPay:', error);
            }
      }
      useEffect(() => {
            const itemsTotal = koiBill.reduce((sum, item) => sum + item.finalPrice, 0);
            setDeposit(itemsTotal * 0.1);
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
                  <Row>
                        <Col span={12}>
                              <Card title="Giỏ hàng">
                                    <List
                                          dataSource={koiBill}
                                          renderItem={(item) => (
                                                <List.Item>
                                                      <h3>Koi {item.koiName}</h3>
                                                      <p>{item.quantity}</p>
                                                      <p><strong>{item.finalPrice.toLocaleString()} đ</strong></p>
                                                </List.Item>
                                          )}
                                    />
                                    <Divider />
                                    <div style={{ marginTop: 16, textAlign: "right" }}>
                                          <h2>Tổng tiền: {totalPrice.toLocaleString()} đ</h2>
                                    </div>
                              </Card>

                        </Col>
                        <Col span={10} style={{ marginLeft: 50 }}>
                              <Title level={3}>Thông tin thanh toán</Title>

                              <Form form={form} layout="vertical" onFinish={handlePay}> 
                                    <Form.Item
                                          name="address"
                                          label="Địa chỉ"
                                          rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                                    >
                                          <Input />
                                    </Form.Item>
                                    <Form.Item label="Chọn dịch vụ giao hàng">
                                          <Select onChange={handleChange} style={{ width: '100%' }}>
                                                {delivery.map((item) => (
                                                      <Option key={item.deliveryId} value={item.deliveryFee}>
                                                            {item.deliveryType} - {item.deliveryFee.toLocaleString()} đ
                                                      </Option>
                                                ))}
                                          </Select>
                                    </Form.Item>
                                    <div style={{ marginBottom: 16 }}>
                                          <Text strong>Phí vận chuyển: </Text>
                                          <Text>{selectedDeliveryFee.toLocaleString()} đ</Text>
                                    </div>
                                    <div style={{ marginBottom: 16 }}>
                                          <Text strong>Tiền đặt cọc (10%): </Text>
                                          <Text>{deposit.toLocaleString()} VND</Text>
                                    </div>
                                    <Divider />
                                    <div style={{ marginBottom: 16 }}>
                                          <Text strong>Tổng tiền thanh toán: </Text>
                                          <Text>{(deposit + selectedDeliveryFee).toLocaleString()} VND</Text>
                                    </div>
                                    <Button type="primary" htmlType="submit">
                                          Thanh toán ngay
                                    </Button>
                              </Form>
                        </Col>
                  </Row>

            </>
      )
}
export default CheckOutKoi;