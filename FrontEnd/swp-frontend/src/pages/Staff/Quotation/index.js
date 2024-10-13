import { useEffect, useState } from "react";
import { get } from "../../../utils/request";
import { Badge, Button, Card, Col, Row } from "antd";


function Quotation() {
      const [quotation, setQuotation] = useState([]);
      const fetchApi = async () => {
            const response = await get("quotation/view-all");
            if (response) {
                  setQuotation(response);
            }
      }
      useEffect(() => {
            fetchApi();
      }, [])
      return (
            <>
                  <div>
                        <h2>Thông tin đặt tour</h2>
                        {quotation.length > 0 ? (
                              <>
                                    <Row gutter={[20, 20]}>
                                          {quotation.map((item) => (
                                                <Col span={8} key={item.quotationId}>
                                                      <Card title="Xác nhận báo giá">
                                                            <p>UserId: <strong>{item.userId}</strong></p>
                                                            <p>TourId: <strong>{item.tourId}</strong></p>
                                                            <p>Giá tiền: <strong>{item.priceOffer}</strong></p>
                                                            <p>
                                                                  <Badge status={item.status === "confirmed" ? "success" : "default"} text={item.status} />
                                                            </p>

                                                            <Button type="primary">Nhập giá</Button>
                                                            <Button type="primary">Gửi cho quản lí</Button>
                                                            <Button type="primary">Gửi cho khách hàng</Button>
                                                      </Card>
                                                </Col>
                                          ))}
                                    </Row>
                              </>
                        ) : (
                              <>
                                    <h1>Không có báo giá nào</h1>
                              </>
                        )}
                  </div>
            </>
      )
}
export default Quotation;