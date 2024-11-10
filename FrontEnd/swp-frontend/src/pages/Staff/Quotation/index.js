import { useEffect, useState } from "react";
import { get, put } from "../../../utils/request";
import { Button, Card, Col, Form, Input, Modal, Pagination, Row } from "antd";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


function Quotation() {
      const [quotation, setQuotation] = useState([]);
      const [modalVisibility, setModalVisibility] = useState({});
      const [form] = Form.useForm();
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

      const updatePrice = async (values, id) => {
            const getTimeCurrent = () => {
                  return new Date().toLocaleString();
            };
            const quotationData = {
                  "priceOffer": values.priceOffer,
                  "status": "Đã nhập giá chuyến đi",
                  "approvedDate": getTimeCurrent(),
                  "description": ""
            };
            const response = await put(`quotation/update/${id}`, quotationData);
            if (response) {
                  setModalVisibility(prev => ({ ...prev, [id]: false }));
                  Swal.fire({
                        icon: "success",
                        title: "Nhập giá thành công!!!",
                  });
                  fetchApi();
            }
      };

      const handleCancel = (id) => {
            setModalVisibility(prev => ({ ...prev, [id]: false }));
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
                  Swal.fire({
                        icon: "success",
                        title: "Đã gửi!!!",
                  });
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
      const updatePrice2th = async (values, id) => {
            const getTimeCurrent = () => {
                  return new Date().toLocaleString();
            };
            const quotationData = {
                  "priceOffer": values.priceOffer,
                  "status": "Xác nhận yêu cầu",
                  "approvedDate": getTimeCurrent(),
                  "description": ""
            };
            const response = await put(`quotation/update/${id}`, quotationData);
            if (response) {
                  setModalVisibility(prev => ({ ...prev, [id]: false }));
                  Swal.fire({
                        icon: "success",
                        title: "Nhập giá thành công!!!",
                  });
                  fetchApi();
            }
      };
      const handleNoAccept = async (item) => {
            const getTimeCurrent = () => {
                  return new Date().toLocaleString();
            };
            const quotationData = {
                  "priceOffer": item.priceOffer,
                  "status": "Không chấp nhận yêu cầu",
                  "approvedDate": getTimeCurrent(),
                  "description": "Cảm ơn Quý khách đã quan tâm đến dịch vụ của chúng tôi. Đây là mức giá cuối cùng chúng tôi có thể cung cấp cho chuyến đi lần này. Rất mong Quý khách thông cảm và hiểu cho quyết định này của chúng tôi."
            };
            const response = await put(`quotation/update/${item.quotationId}`, quotationData);
            if (response) {
                  setMessages(prev => ({ ...prev, [item.quotationId]: '' }));
                  Swal.fire({
                        icon: "success",
                        title: "Đã gửi!!!",
                  });
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
                                                                                          onCancel={() => handleCancel(item.quotationId)}
                                                                                          footer={null}
                                                                                    >
                                                                                          <Form
                                                                                                onFinish={(values) => updatePrice(values, item.quotationId)}
                                                                                                layout="vertical"
                                                                                                form={form}
                                                                                          >

                                                                                                <Form.Item
                                                                                                      name="priceOffer"
                                                                                                      label="Nhập giá tiền"
                                                                                                      rules={[{ required: true, message: "Vui lòng nhập giá tour!" },
                                                                                                      {
                                                                                                            required: true,
                                                                                                            pattern: /^[1-9]\d*$/,
                                                                                                            message: 'Vui lòng nhập số lớn hơn 0 và không chứa ký tự đặc biệt'
                                                                                                      }]}
                                                                                                >
                                                                                                      <Input style={{ width: "100%" }} placeholder="Nhập giá tour" />
                                                                                                </Form.Item>
                                                                                                <Form.Item>
                                                                                                      <Button type="primary" htmlType="submit">
                                                                                                            Nhập giá
                                                                                                      </Button>
                                                                                                </Form.Item>
                                                                                          </Form>
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
                                                                        <Button type="primary" onClick={() => showModal(item.quotationId)} className="mr-10">Nhập giá mới</Button>
                                                                        <Modal
                                                                              title="Nhập giá tiền cho chuyến đi"
                                                                              visible={modalVisibility[item.quotationId]}
                                                                              onCancel={() => handleCancel(item.quotationId)}
                                                                              footer={null}
                                                                        >
                                                                              <p>Theo quy định của công ty, giá mới không được giảm quá 5% giá cũ</p>
                                                                              <Form
                                                                                    onFinish={(values) => updatePrice2th(values, item.quotationId)}
                                                                                    layout="vertical"
                                                                                    form={form}
                                                                              >
                                                                                    <Form.Item
                                                                                          name="priceOffer"
                                                                                          label="Nhập giá tiền"
                                                                                          rules={[{ required: true, message: "Vui lòng nhập giá tour!" },
                                                                                          {
                                                                                                required: true,
                                                                                                pattern: /^[1-9]\d*$/,
                                                                                                message: 'Vui lòng nhập số lớn hơn 0 và không chứa ký tự đặc biệt'
                                                                                          },
                                                                                          {
                                                                                                validator: async (_, value) => {
                                                                                                      const minPrice = item.priceOffer * 0.95;
                                                                                                      if (value < minPrice) {
                                                                                                            throw new Error(`Giá mới không được thấp hơn ${minPrice.toLocaleString()} (95% giá hiện tại)`);
                                                                                                      }
                                                                                                }
                                                                                          }
                                                                                          ]}
                                                                                    >
                                                                                          <Input
                                                                                                style={{ width: "100%" }}
                                                                                                placeholder="Nhập giá tour"
                                                                                          />
                                                                                    </Form.Item>
                                                                                    <Form.Item>
                                                                                          <Button type="primary" htmlType="submit">
                                                                                                Nhập giá
                                                                                          </Button>
                                                                                    </Form.Item>
                                                                              </Form>
                                                                        </Modal>
                                                                        <Button color="primary" danger onClick={() => handleNoAccept(item)}>Không chấp nhận</Button>
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