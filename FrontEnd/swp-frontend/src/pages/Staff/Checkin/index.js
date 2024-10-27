import { useEffect, useState } from "react";
import { get, put } from "../../../utils/request";
import { Button, Card, Col, Row } from "antd";

function Checkin() {
      const [quotation, setQuotation] = useState([]);

      const fetchApi = async () => {
            const response = await get("quotation/view-all");
            if (response) {
                  setQuotation(response);
            }
      };
      useEffect(() => {
            fetchApi();
      }, []);
      const checkIn = async (quotationId, priceOffer) => {
            const getTimeCurrent = () => {
                  return new Date().toLocaleString();
            };
            const quotationData = {
                  "priceOffer": priceOffer,
                  "status": "Đã check-in",
                  "approvedDate": getTimeCurrent(),
                  "description": '',
            };
            const response = await put(`quotation/update/${quotationId}`, quotationData);
            if (response) {
                  fetchApi();
            }
      }
      return (
            <>
                  {quotation.length > 0 ? (
                        <Row gutter={[20, 20]}>
                              {quotation.map((item) => (
                                    <Col span={12} key={item.quotationId}>
                                          <Card title="Check-in máy bay">
                                                <p>Họ và tên: <strong>{item.fullName}</strong></p>
                                                <p>Email: <strong>{item.email}</strong></p>
                                                <p>Số điện thoại: <strong>{item.phoneNumber}</strong></p>
                                                <p>TourId: <strong>{item.tourId}</strong></p>
                                                {item.status === "Đã thanh toán" && (
                                                      <Button type="primary" onClick={() => checkIn(item.quotationId, item.priceOffer)}>
                                                            Làm thủ tục check-in
                                                      </Button>
                                                )}
                                          </Card>
                                    </Col>
                              ))}
                        </Row>
                  ) : (
                        <h1>Không có báo giá nào</h1>
                  )}
            </>
      )
}
export default Checkin;