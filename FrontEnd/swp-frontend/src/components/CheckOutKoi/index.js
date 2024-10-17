import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Card, Col, List, Row, Typography, Button, Divider } from "antd";
import GoBack from "../GoBack";
import { get, post } from "../../utils/request";

const { Title, Text } = Typography;

function CheckOutKoi() {
      const location = useLocation();
      const { totalPrice } = location.state || { totalPrice: 0 };;
      const params = useParams();
      const [koiBill, setKoiBill] = useState([]);
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
                  "deposit": totalPrice*0.1,
                  "remain": 0,
                  "status": "Đã thanh toán tiền cọc"
            }
            const response = await post(`payStatus/create/${params.id}`, data);
            if(response){
                  window.location.href = `/`;
            }
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
                                    <Text strong>Tổng tiền: </Text>
                                    <Text>{totalPrice.toLocaleString()} VND</Text>
                              </div>
                              <div style={{ marginBottom: 16 }}>
                                    <Text strong>Tiền đặt cọc (10%): </Text>
                                    <Text>{(totalPrice * 0.1).toLocaleString()} VND</Text>
                              </div>
                              <Divider />
                              <Button type="primary" onClick={handlePay}>
                                    Thanh toán ngay
                              </Button>
                        </Col>
                  </Row>

            </>
      )
}
export default CheckOutKoi;