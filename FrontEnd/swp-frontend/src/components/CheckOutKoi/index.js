import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Col, List, Row, Typography, Button, Divider, Select } from "antd";
import GoBack from "../GoBack";
import { get, post } from "../../utils/request";

const { Title, Text } = Typography;

const { Option } = Select;

function CheckOutKoi() {
      const params = useParams();
      const [koiBill, setKoiBill] = useState([]);
      const [delivery, setDelivery] = useState([]);
      const [selectedDeliveryFee, setSelectedDeliveryFee] = useState(0);
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
            const data = {
                  "paymentMethod": "VN PAY",
                  "deposit": totalPrice * 0.1,
                  "remain": 0,
                  "status": "Đã thanh toán tiền cọc"
            }
            const response = await post(`payStatus/create/${params.id}`, data);
            if (response) {
                  window.location.href = `/`;
            }
      }
      useEffect(() => {
            const itemsTotal = koiBill.reduce((sum, item) => sum + item.finalPrice, 0);
            setDeposit(itemsTotal*0.1);
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
      const handleChange = (value) => {
            setSelectedDeliveryFee(value);
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
                                                      <h3>Koi {item.koiId}</h3>
                                                      <p>{item.quantity}</p>
                                                      <p><strong>{item.finalPrice} đ</strong></p>
                                                </List.Item>
                                          )}
                                    />
                                    <Divider />
                                    <div style={{ marginTop: 16, textAlign: "right" }}>
                                          <h2>Tổng tiền: {totalPrice} đ</h2>
                                    </div>
                              </Card>

                        </Col>
                        <Col span={10} style={{ marginLeft: 50 }}>
                              <Title level={3}>Thông tin thanh toán</Title>
                              <div style={{ marginBottom: 16 }}>
                                    <Text strong>Chọn dịch vụ: </Text>
                                    <Select onChange={handleChange} style={{width: 300}}>
                                          {delivery.map((item) => (
                                                <Option key={item.id} value={item.deliveryFee}>
                                                      {item.deliveryType} - {item.deliveryFee.toLocaleString()} đ
                                                </Option>
                                          ))}

                                    </Select>
                              </div>
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
                              <Button type="primary" onClick={handlePay}>
                                    Thanh toán ngay
                              </Button>
                        </Col>
                  </Row>

            </>
      )
}
export default CheckOutKoi;