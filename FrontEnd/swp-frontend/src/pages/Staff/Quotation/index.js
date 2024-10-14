import { useEffect, useState } from "react";
import { get, put } from "../../../utils/request";
import { Badge, Button, Card, Col, Input, Modal, Row } from "antd";


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
      const [modalVisibility, setModalVisibility] = useState({});
      const [prices, setPrices] = useState({});

      const showModal = (id) => {
            setModalVisibility(prev => ({ ...prev, [id]: true }));
      };

      const updatePrice = async (id) => {
            const getTimeCurrent = () => {
                  return new Date().toLocaleString();
            };
            const quotationData = {
                  "priceOffer": prices[id],
                  "status": "Chờ xác nhận",
                  "approvedDate": getTimeCurrent(),
            };
            const response = await put(`quotation/update/${id}`, quotationData);
            if (response) {
                  setModalVisibility(prev => ({ ...prev, [id]: false }));
                  setPrices(prev => ({ ...prev, [id]: '' }));
                  fetchApi();
            }
      };

      const handleCancel = (id) => {
            setModalVisibility(prev => ({ ...prev, [id]: false }));
            setPrices(prev => ({ ...prev, [id]: '' }));
      };
      const sendToManager = async (quotationId, priceOffer) => {
            const getTimeCurrent = () => {
                  return new Date().toLocaleString();
            };
            const quotationData = {
                  "priceOffer": priceOffer,
                  "status": "Báo giá cho quản lý",
                  "approvedDate": getTimeCurrent(),
            };
            const response = await put(`quotation/update/${quotationId}`, quotationData);
            if (response) {
                  fetchApi();
            }
      }
      const sendToCustomer = async (quotationId, priceOffer) => {
            const getTimeCurrent = () => {
                  return new Date().toLocaleString();
            };
            const quotationData = {
                  "priceOffer": priceOffer,
                  "status": "Đã xác nhận",
                  "approvedDate": getTimeCurrent(),
            };
            const response = await put(`quotation/update/${quotationId}`, quotationData);
            if (response) {
                  fetchApi();
            }
      }

      return (
            <>
                  <div>
                        <h2>Thông tin đặt tour</h2>
                        {quotation.length > 0 ? (
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
                                                      {item.status !== "Đã thanh toán" && (
                                                            <>
                                                            {prices[item.quotationId] > 0 ? (
                                                                  <Button type="primary" onClick={() => showModal(item.quotationId)}>Nhập giá</Button>
                                                            ) : (
                                                                  <></>
                                                            )}
                                                                  <Modal
                                                                        title="Nhập giá tiền cho chuyến đi"
                                                                        visible={modalVisibility[item.quotationId]}
                                                                        onOk={() => updatePrice(item.quotationId)}
                                                                        onCancel={() => handleCancel(item.quotationId)}
                                                                  >
                                                                        <Input
                                                                              placeholder="Nhập giá"
                                                                              value={prices[item.quotationId] || ''}
                                                                              onChange={(e) => setPrices(prev => ({ ...prev, [item.quotationId]: e.target.value }))}
                                                                        />
                                                                  </Modal>
                                                                  {item.status !== "Báo giá cho quản lý" && item.status !== "Đã xác nhận" && (
                                                                        <Button type="primary" onClick={() => sendToManager(item.quotationId, item.priceOffer)}>
                                                                              Báo giá cho quản lí
                                                                        </Button>
                                                                  )}
                                                                  {item.status !== "Đã xác nhận" && item.status === "Báo giá cho sales" && (
                                                                        <Button type="primary" onClick={() => sendToCustomer(item.quotationId, item.priceOffer)}>
                                                                              Báo giá cho khách hàng
                                                                        </Button>
                                                                  )}
                                                            </>
                                                      )}

                                                </Card>
                                          </Col>
                                    ))}
                              </Row>
                        ) : (
                              <h1>Không có báo giá nào</h1>
                        )}
                  </div>
            </>
      );
}
export default Quotation;