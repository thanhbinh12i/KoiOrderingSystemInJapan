import React, { useEffect, useState } from 'react';
import { Result, Button, Typography, Row, Col, Card, Descriptions, Statistic } from 'antd';
import { CheckCircleFilled, PrinterOutlined, HomeFilled } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import './PaymentSuccess.scss';
import { get, post, put } from '../../utils/request';

const { Title } = Typography;

const PaymentSuccess = () => {
      const [bill, setBill] = useState();
      const params = useParams();
      const date = new Date().toLocaleString();
      const userId = localStorage.getItem("id");
      const [price, setPrice] = useState(0);
      useEffect(() => {
            const fetchApi = async () => {
                  const pendingPaymentData = localStorage.getItem('pendingPaymentData');
                  const pendingPaymentKoi = localStorage.getItem('pendingPaymentKoi');
                  if (pendingPaymentData) {
                        const paymentData = JSON.parse(pendingPaymentData);
                        const billResponse = await post(`bill/create/${userId}-${paymentData.quotationId}`, paymentData);
                        if (billResponse) {
                              const getTimeCurrent = () => {
                                    return new Date().toLocaleString();
                              };
                              const quotationData = {
                                    "priceOffer": paymentData.price,
                                    "status": "Đã thanh toán",
                                    "approvedDate": getTimeCurrent(),
                                    "description": ""
                              };
                              await put(`quotation/update/${paymentData.quotationId}`, quotationData);
                              const response = await get(`bill/view-by-id/${billResponse.billId}`);
                              if (response) {
                                    setBill(response);
                                    setPrice(paymentData.price);
                              }
                              localStorage.removeItem('pendingPaymentData');
                        }
                  } else if (pendingPaymentKoi) {
                        const paymentData = JSON.parse(pendingPaymentKoi);
                        const currentBill = await get(`bill/view-by-id/${paymentData.id}`);
                        const newTotalPrice = currentBill.price + paymentData.totalPrice;
                        const response = await put(`bill/update/${paymentData.id}`, { "price": newTotalPrice });
                        if (response) {
                              const data = {
                                    "deliveryAddress": paymentData.deliveryAddress,
                                    "deliveryStatusText": "Đã thanh toán",
                                    "estimatedDate": ""
                              }
                              const deliveryResponse = await post(`delivery-status/create/${paymentData.id}-${paymentData.deliveryId}`, data);
                              if(deliveryResponse){
                                    setBill(currentBill);
                                    setPrice(paymentData.price);
                              }
                              localStorage.removeItem('pendingPaymentKoi');
                        }

                  }
            };
            fetchApi();
      }, [params.id, userId])

      const handlePrint = () => {
            window.print();
      };

      return (
            <div className="payment-success-page">
                  <Row justify="center">
                        <Col xs={24} sm={22} md={20} lg={18} xl={16}>
                              <Card className="success-card">
                                    <Result
                                          icon={<CheckCircleFilled className="success-icon" />}
                                          title={<Title level={2}>Thanh toán thành công!</Title>}
                                    />
                                    {bill && (
                                          <>
                                                <div className="payment-details">
                                                      <Descriptions title="Chi tiết thanh toán" bordered column={{ xs: 1, sm: 2 }}>
                                                            <Descriptions.Item label="Mã giao dịch">{params.id}</Descriptions.Item>
                                                            <Descriptions.Item label="Ngày thanh toán">{date}</Descriptions.Item>
                                                            <Descriptions.Item label="Phương thức">Thẻ ngân hàng</Descriptions.Item>
                                                            <Descriptions.Item label="Tour"></Descriptions.Item>
                                                            <Descriptions.Item label="Khách hàng">{bill.userFullName}</Descriptions.Item>
                                                            <Descriptions.Item label="Số điện thoại">{bill.phoneNumber}</Descriptions.Item>
                                                            <Descriptions.Item label="Email">{bill.email}</Descriptions.Item>
                                                      </Descriptions>

                                                      <div className="amount-container">
                                                            <Statistic
                                                                  title="Tổng thanh toán"
                                                                  value={price.toLocaleString()}
                                                                  precision={0}
                                                                  suffix="VND"
                                                                  className="amount-statistic"
                                                            />
                                                      </div>
                                                </div>
                                          </>
                                    )}


                                    <div className="action-buttons">
                                          <Button type="primary" icon={<PrinterOutlined />} size="large" onClick={handlePrint}>
                                                In hóa đơn
                                          </Button>
                                          <Link to="/">
                                                <Button icon={<HomeFilled />} size="large">
                                                      Về trang chủ
                                                </Button>
                                          </Link>
                                    </div>
                              </Card>
                        </Col>
                  </Row>
            </div>
      );
};

export default PaymentSuccess;