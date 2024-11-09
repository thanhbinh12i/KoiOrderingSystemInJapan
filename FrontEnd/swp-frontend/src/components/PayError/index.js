import { useEffect } from "react";
import './PayError.scss';

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
                                                icon={<CheckCircleFilled className="error-icon" />}
                                                title={<Title level={2}>Thanh toán thành công!</Title>}
                                          />
                                    </Card>
                              </Col>
                        </Row>
                  </div>
            </>
      )
}
export default PayError;