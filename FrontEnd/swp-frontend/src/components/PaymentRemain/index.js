import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get, post } from "../../utils/request";
import { Button, Card, Col, Divider, List, Row, Space } from "antd";
import GoBack from "../GoBack";

function PaymentRemain() {
      const params = useParams();
      const [billData, setBillData] = useState(null);
      const [koiBill, setKoiBill] = useState([]);
      const [totalPrice, setTotalPrice] = useState(0);
      useEffect(() => {
            const fetchBillData = async () => {
                  try {
                        const response = await get(`bill/view-by-id/${params.id}`);
                        setBillData(response);
                        const koiBillResponse = await get(`koi-bill/view-by-billId/${params.id}`);
                        if (koiBillResponse) {
                              setKoiBill(koiBillResponse);
                        }
                  } catch (error) {
                        console.error('Lỗi khi lấy thông tin đơn hàng:', error);
                  }
            };
            fetchBillData();
      }, [params.id]);
      useEffect(() => {
            const itemsTotal = koiBill.reduce((sum, item) => sum + item.finalPrice * item.quantity, 0);
            setTotalPrice(itemsTotal);
      }, [koiBill]);
      const onFinishVNPay = async () => {
            try {
                  const payStatusResponse = await get(`payStatus/view-billId/${params.id}`);

                  const paymentData = {
                        orderType: "VNPAY",
                        amount: payStatusResponse.remain,
                        orderDescription: `Thanh toán cho đơn hàng ${params.id}`,
                        name: billData.userFullName,
                        quotationId: params.id
                  };
                  const paymentResponse = await post('payment', paymentData);

                  if (paymentResponse) {
                        localStorage.setItem('pendingPaymentRemain', JSON.stringify({ payStatusResponse }));
                        window.location.href = paymentResponse;
                  }
            } catch (error) {
                  console.error('Lỗi khi xử lý thanh toán VNPay:', error);
            }
      };
      return (
            <>
                  <GoBack />
                  <Row gutter={[20,20]}>
                        <Col span={12}>
                              <Card title="Đơn hàng">
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
                                          <h2>Tổng tiền: {totalPrice?.toLocaleString()} đ</h2>
                                    </div>
                              </Card>

                        </Col>
                        <Col span={10} style={{ marginLeft: 50 }}>
                              <div >
                                    <Card title="Thông tin thanh toán">
                                          {billData && (
                                                <>
                                                      <p>Mã đơn hàng: {billData.billId}</p>
                                                      <p>Người nhận: {billData.userFullName}</p>
                                                      <p>Số tiền còn lại (80%): <strong>{(0.8*totalPrice)?.toLocaleString()} đ </strong></p>
                                                </>
                                          )}

                                          <Space direction="vertical" style={{ width: '100%', marginTop: '20px' }}>
                                                <Button type="primary" onClick={onFinishVNPay} block>
                                                      Thanh toán qua VNPAY
                                                </Button>
                                          </Space>
                                    </Card>
                              </div>
                        </Col>
                  </Row>

            </>
      )
}
export default PaymentRemain;