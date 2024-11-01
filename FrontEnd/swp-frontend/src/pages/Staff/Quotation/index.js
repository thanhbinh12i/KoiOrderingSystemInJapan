import { useEffect, useState } from "react";
import { get, put } from "../../../utils/request";
import { Button, Card, Col, Input, Modal, Pagination, Row } from "antd";
import { Link } from "react-router-dom";


function Quotation() {
      const [quotation, setQuotation] = useState([]);
      const [modalVisibility, setModalVisibility] = useState({});
      const [prices, setPrices] = useState({});
      const [messages, setMessages] = useState({});
      const [currentPage, setCurrentPage] = useState(1);
      const pageSize = 3;

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

      const showModal = (id) => {
            setModalVisibility(prev => ({ ...prev, [id]: true }));
      };

      const updatePrice = async (id) => {
            const getTimeCurrent = () => {
                  return new Date().toLocaleString();
            };
            const quotationData = {
                  "priceOffer": prices[id],
                  "status": "Đã nhập giá chuyến đi",
                  "approvedDate": getTimeCurrent(),
                  "description": ""
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

      const sendToManager = async (item) => {
            const getTimeCurrent = () => {
                  return new Date().toLocaleString();
            };
            const quotationData = {
                  "priceOffer": item.priceOffer,
                  "status": "Báo giá cho quản lý",
                  "approvedDate": getTimeCurrent(),
                  "description": messages[item.quotationId] || ''
            };
            const response = await put(`quotation/update/${item.quotationId}`, quotationData);
            if (response) {
                  setMessages(prev => ({ ...prev, [item.quotationId]: '' }));
                  fetchApi();
            }
      };

      const sendToCustomer = async (item) => {
            const getTimeCurrent = () => {
                  return new Date().toLocaleString();
            };
            const quotationData = {
                  "priceOffer": item.priceOffer,
                  "status": "Đã xác nhận",
                  "approvedDate": getTimeCurrent(),
                  "description": messages[item.quotationId] || item.description
            };
            const response = await put(`quotation/update/${item.quotationId}`, quotationData);
            if (response) {
                  setMessages(prev => ({ ...prev, [item.quotationId]: '' }));
                  fetchApi();
            }
      };
      const handleNoAccept = async (item) => {
            const getTimeCurrent = () => {
                  return new Date().toLocaleString();
            };
            const quotationData = {
                  "priceOffer": item.priceOffer,
                  "status": "Đã xác nhận yêu cầu",
                  "approvedDate": getTimeCurrent(),
                  "description": "Cảm ơn Quý khách đã quan tâm đến dịch vụ của chúng tôi. Đây là mức giá cuối cùng chúng tôi có thể cung cấp cho chuyến đi lần này. Rất mong Quý khách thông cảm và hiểu cho quyết định này của chúng tôi."
            };
            const response = await put(`quotation/update/${item.quotationId}`, quotationData);
            if (response) {
                  setMessages(prev => ({ ...prev, [item.quotationId]: '' }));
                  fetchApi();
            }
      }
      return (
            <>
                  <div className="quotation-staff">
                        <h2>Thông tin đặt tour</h2>
                        {quotation.length > 0 ? (
                              <>
                                    {getCurrentPageData().map((item) => (
                                          <Card key={item.quotationId}>
                                                <Row>
                                                      <Col span={18}>
                                                            <h3>Báo giá {item.quotationId}</h3>
                                                            <Row gutter={[16, 8]}>
                                                                  <Col span={12}>
                                                                        <p>Họ và tên: <strong>{item.fullName}</strong></p>
                                                                        <p>Email: <strong>{item.email}</strong></p>
                                                                        <p>Số điện thoại: <strong>{item.phoneNumber}</strong></p>
                                                                  </Col>
                                                                  <Col span={12}>
                                                                        <p>Chuyến đi: <strong>{item.tourDetail.tourName}</strong></p>
                                                                        <p>Giá tiền: <strong>{item.priceOffer.toLocaleString()} đ</strong></p>
                                                                        <p>Trạng thái: <strong>{item.status}</strong></p>
                                                                  </Col>
                                                            </Row>
                                                            {
                                                                  item.description !== "" && (
                                                                        <>
                                                                              <p>Lời nhắn: <strong>{item.description}</strong></p>
                                                                        </>
                                                                  )
                                                            }
                                                            {item.status === "Chờ xác nhận" && (
                                                                  <>
                                                                        {item.priceOffer === 0 ? (
                                                                              <>
                                                                                    <Button type="primary" onClick={() => showModal(item.quotationId)}>Nhập giá</Button>
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
                                                                              </>
                                                                        ) : (
                                                                              <Button type="primary" onClick={() => sendToCustomer(item)}>Xác nhận đặt chỗ</Button>
                                                                        )}

                                                                  </>
                                                            )}
                                                            {item.status === "Đã nhập giá chuyến đi" && (
                                                                  <>
                                                                        <Input.TextArea
                                                                              placeholder="Nhập lời nhắn"
                                                                              value={messages[item.quotationId] || ''}
                                                                              onChange={(e) => setMessages(prev => ({ ...prev, [item.quotationId]: e.target.value }))}
                                                                              style={{ marginBottom: '10px' }}
                                                                        />

                                                                        <Button type="primary" onClick={() => sendToManager(item)}>
                                                                              Báo giá cho quản lí
                                                                        </Button>
                                                                  </>
                                                            )}
                                                            {item.status === "Xác nhận báo giá" && (
                                                                  <>
                                                                        <Input.TextArea
                                                                              placeholder="Nhập lời nhắn"
                                                                              value={messages[item.quotationId] || ''}
                                                                              onChange={(e) => setMessages(prev => ({ ...prev, [item.quotationId]: e.target.value }))}
                                                                              style={{ marginBottom: '10px' }}
                                                                        />
                                                                        <Button type="primary" onClick={() => sendToCustomer(item)}>
                                                                              Báo giá cho khách hàng
                                                                        </Button>
                                                                  </>
                                                            )}
                                                            {item.status === "Yêu cầu thương lượng giá" && (
                                                                  <>
                                                                        <Button type="primary" onClick={() => showModal(item.quotationId)}>Nhập giá mới</Button>
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
                                                                        <Button type="primary" onClick={() => handleNoAccept(item)}>Không chấp nhận</Button>
                                                                  </>
                                                            )}
                                                      </Col>
                                                      <Col span={6}>
                                                            <Link to={`/staff/quotation-detail/${item.tourId}`}>
                                                                  <Button type="default">
                                                                        Xem chi tiết chuyến đi
                                                                  </Button>
                                                            </Link>
                                                      </Col>
                                                </Row>
                                          </Card>
                                    ))}
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
                  </div >
            </>
      );
}
export default Quotation;