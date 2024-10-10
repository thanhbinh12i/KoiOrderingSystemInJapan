import React, { useEffect, useState } from 'react';
import { Result, Button, Typography, Row, Col, Card, Descriptions, Statistic } from 'antd';
import { CheckCircleFilled, PrinterOutlined, HomeFilled } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import './PaymentSuccess.scss';
import { get } from '../../utils/request';

const { Title, Text } = Typography;

const PaymentSuccess = () => {
      const [bill, setBill] = useState();
      const params = useParams();
      const date = new Date().toLocaleString();
      useEffect(() => {
            const fetchApi = async () => {
                  const response = await get(`bill/view-by-id/${params.id}`);
                  if (response) {
                        setBill(response);
                  }
            }
            fetchApi();
      }, [params.id])

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
                                          subTitle={<Text className="success-subtitle">Cảm ơn bạn đã đặt tour. Chúc bạn có một chuyến đi thật thành công.</Text>}
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
                                                                  value={bill.price}
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