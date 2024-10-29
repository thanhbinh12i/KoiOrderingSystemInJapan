import { useEffect, useState } from "react";
import { get, put } from "../../../utils/request";
import { Button, Card, Col, Pagination, Row } from "antd";

function Checkin() {
      const [quotation, setQuotation] = useState([]);
      const [currentPage, setCurrentPage] = useState(1);
      const pageSize = 6;

      const getCurrentPageData = () => {
            const startIndex = (currentPage - 1) * pageSize;
            return quotation.slice(startIndex, startIndex + pageSize);
      };


      const fetchApi = async () => {
            const response = await get("quotation/view-all");
            if (response) {
                  const quotationsWithTours = await Promise.all(
                        response.map(async (quotation) => {
                              const tourResponse = await get(`tour/view-tourId/${quotation.tourId}`);
                              return {
                                    ...quotation,
                                    tourDetail: tourResponse
                              };
                        })
                  );
                  setQuotation(quotationsWithTours.reverse());
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
                        <>
                              <Row gutter={20}>
                                    {getCurrentPageData().map((item) => (
                                          <Col span={12} key={item.quotationId}>
                                                <Card title="Check-in máy bay">
                                                      <p>Họ và tên: <strong>{item.fullName}</strong></p>
                                                      <p>Email: <strong>{item.email}</strong></p>
                                                      <p>Số điện thoại: <strong>{item.phoneNumber}</strong></p>
                                                      <p>Chuyến đi: <strong>{item.tourDetail.tourName}</strong></p>
                                                      {item.status === "Đã thanh toán" && (
                                                            <Button type="primary" onClick={() => checkIn(item.quotationId, item.priceOffer)}>
                                                                  Làm thủ tục check-in
                                                            </Button>
                                                      )}
                                                </Card>
                                          </Col>
                                    ))}
                              </Row>
                              <div style={{ marginTop: '20px', textAlign: 'right' }}>
                                    <Pagination
                                          current={currentPage}
                                          onChange={(page) => setCurrentPage(page)}
                                          total={quotation.length}
                                          pageSize={pageSize}
                                          showSizeChanger={false}
                                          showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} mục`}
                                    />
                              </div>
                        </>

                  ) : (
                        <h1>Không có báo giá nào</h1>
                  )}
            </>
      )
}
export default Checkin;