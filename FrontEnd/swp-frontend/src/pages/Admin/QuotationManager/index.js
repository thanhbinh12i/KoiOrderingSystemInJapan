import { Badge, Button, Card, Col, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { get, put } from "../../../utils/request";

function QuotationManager() {
      const [quotation, setQuotation] = useState([]);
      const [messages, setMessages] = useState({});
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
                  "description": messages[quotationId] || ''
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
                                                      <p>Họ và tên: <strong>{item.fullName}</strong></p>
                                                      <p>Email: <strong>{item.email}</strong></p>
                                                      <p>Số điện thoại: <strong>{item.phoneNumber}</strong></p>
                                                      <p>TourId: <strong>{item.tourId}</strong></p>
                                                      <p>Giá tiền: <strong>{item.priceOffer}</strong></p>
                                                      <p>
                                                            <Badge status={item.status === "confirmed" ? "success" : "default"} text={item.status} />
                                                      </p>
                                                      {item.status === "Báo giá cho quản lý" && (
                                                            <>
                                                                  <Input.TextArea
                                                                        placeholder="Nhập lời nhắn"
                                                                        value={messages[item.quotationId] || ''}
                                                                        onChange={(e) => setMessages(prev => ({ ...prev, [item.quotationId]: e.target.value }))}
                                                                        style={{ marginBottom: '10px' }}
                                                                  />
                                                                  <Button type="primary" onClick={() => handleSuccess(item.quotationId, item.priceOffer)}>
                                                                        Xác nhận
                                                                  </Button>
                                                            </>
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