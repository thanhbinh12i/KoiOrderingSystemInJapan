import { useEffect } from "react";
import { Col, Result, Row, Card, Typography, Button } from "antd";
import { CloseOutlined, HomeFilled } from '@ant-design/icons';
import { Link } from "react-router-dom";
import './PayError.scss';

const { Title } = Typography;

function PayError() {
      useEffect(() => {
            const fetchApi = () => {
                  const pendingPaymentData = localStorage.getItem('pendingPaymentData');
                  const pendingPaymentKoi = localStorage.getItem('pendingPaymentKoi');
                  const pendingPaymentRemain = localStorage.getItem('pendingPaymentRemain');
                  if (pendingPaymentData) {
                        localStorage.removeItem('pendingPaymentData');
                  } else if (pendingPaymentKoi) {
                        localStorage.removeItem('pendingPaymentKoi');
                  } else if (pendingPaymentRemain) {
                        localStorage.removeItem('pendingPaymentRemain');
                  }
            }
            fetchApi();
      }, [])
      return (
            <>
                  <div className="payment-error-page">
                        <Row justify="center">
                              <Col xs={24} sm={22} md={20} lg={18} xl={16}>
                                    <Card className="error-card">
                                          <Result
                                                icon={<CloseOutlined className="error-icon" />}
                                                title={<Title level={2}>Hủy thanh toán!</Title>}
                                          />
                                          <div className="action-buttons">
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
            </>
      )
}
export default PayError;