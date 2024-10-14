import { Badge, Button, Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { get, put } from "../../../utils/request";

function QuotationManager() {
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
      const handleSuccess = async (quotationId, priceOffer) => {
            const getTimeCurrent = () => {
                  return new Date().toLocaleString();
            };
            const quotationData = {
                  "priceOffer": priceOffer,
                  "status": "Xác nhận báo giá",
                  "approvedDate": getTimeCurrent(),
            };
            const response = await put(`quotation/update/${quotationId}`, quotationData);
            if (response) {
                  fetchApi();
            }
      }
      return (
            <>
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
                                                      {item.status === "Báo giá cho quản lý" && (
                                                             <Button type="primary" onClick={() => handleSuccess(item.quotationId, item.priceOffer)}>Xác nhận</Button>
                                                      )}
                                                     
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

            </>
      )
}
export default QuotationManager;