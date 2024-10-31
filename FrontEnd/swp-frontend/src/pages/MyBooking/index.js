import { useEffect, useState } from "react";
import { del, get, put } from "../../utils/request";
import { Button, Form, Input, Modal, Popconfirm, Table, Tooltip } from "antd";
import "./MyBooking.scss"
import { Link, NavLink, useNavigate } from "react-router-dom";
import CancelBooking from "./CancelBooking";

function MyBooking() {
      const [quotation, setQuotation] = useState([]);
      const [bill, setBill] = useState([]);
      const userId = localStorage.getItem("id");
      const [isModalVisible, setIsModalVisible] = useState(false);
      const navigate = useNavigate();
      const [form] = Form.useForm();
      const showModal = () => {
            setIsModalVisible(true);
      };

      const handleCancel = () => {
            setIsModalVisible(false);
      };
      const handleOk = async () => {
            handleCancel();
            fetchApi();
      };
      const fetchApi = async () => {
            const response = await get(`quotation/view/${userId}`);
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
                  setQuotation(quotationsWithTours);
            }
      }
      useEffect(() => {
            fetchApi();
            // eslint-disable-next-line
      }, [userId]);
      useEffect(() => {
            const fetchApi = async () => {
                  const response = await get(`bill/view-by-user-id/${userId}`);
                  if (response && Array.isArray(response)) {
                        setBill(response);
                  }
            }
            fetchApi();
      }, [userId])
      const columns = [
            {
                  title: 'Id',
                  dataIndex: 'quotationId',
                  key: 'quotationId',
            },
            {
                  title: 'Chuyến đi',
                  dataIndex: ['tourDetail', 'tourName'],
                  key: 'tourName',
            },
            {
                  title: 'Giá tiền',
                  dataIndex: 'priceOffer',
                  key: 'priceOffer',
                  render: (_, record) => (
                        <strong>{record.priceOffer.toLocaleString()}</strong>
                  )
            },
            {
                  title: 'Ngày xác nhận',
                  dataIndex: 'approvedDate',
                  key: 'approvedDate',
            },
            {
                  title: 'Trạng thái',
                  dataIndex: 'status',
                  key: 'status',
                  render: (text) => (['Chờ xác nhận', 'Đã xác nhận', 'Đã thanh toán', "Đã check-in", "Đã hủy", "Khách hàng không mua cá"].includes(text) ? text : "Chờ xác nhận"),
            },
            {
                  title: 'Chi tiết chuyến đi',
                  key: 'tourDetail',
                  render: (_, record) => (
                        <Link to={`/tours/${record.tourId}`}>
                              <Button type="primary">
                                    Xem chi tiết
                              </Button>
                        </Link>
                  )
            },
            {
                  title: 'Hành động',
                  key: 'action',
                  render: (_, record) => {
                        if (record.status === "Chờ xác nhận") {
                              const handleCancelBooking = async () => {
                                    const response = del('quotation/delete', record.quotationId);
                                    if (response) {
                                          fetchApi();
                                    }
                              }
                              return (
                                    <>
                                          <Tooltip title="Hủy đặt chỗ chuyến đi này">
                                                <Popconfirm title="Bạn chắc chắn có muốn hủy đặt chỗ không?" onConfirm={handleCancelBooking}>
                                                      <Button color="primary" danger>Hủy đặt chỗ</Button>
                                                </Popconfirm>
                                          </Tooltip>
                                    </>
                              )
                        } else if (record.status === "Đã xác nhận") {
                              const handleCancelBooking = async () => {
                                    const response = del('quotation/delete', record.quotationId);
                                    if (response) {
                                          fetchApi();
                                    }
                              }
                              const handleNoConfirm = async (values) => {
                                    const quotationData = {
                                          "priceOffer": record.priceOffer,
                                          "status": "Chờ xác nhận",
                                          "approvedDate": record.approvedDate,
                                          "description": values.description,
                                    };
                                    const response = await put(`quotation/update/${record.quotationId}`, quotationData);
                                    if (response) {
                                          fetchApi();
                                          setIsModalVisible(false);
                                    }
                              }
                              return (
                                    <>
                                          <Link to={`/pay-booking/${record.quotationId}`} state={{ price: record.priceOffer }} className="pr-10">
                                                <Button type="primary">
                                                      Thanh toán
                                                </Button>
                                          </Link>
                                          {record.tourDetail.tourName === "Tour Custom" && (
                                                <>
                                                      <Button color="default" variant="solid" onClick={() => showModal()}>Yêu cầu giá khác</Button>
                                                </>
                                          )}
                                          <Modal
                                                title="Yêu cầu thương lượng giá chuyến đi"
                                                open={isModalVisible}
                                                onCancel={handleCancel}
                                                footer={null}
                                          >
                                                <Form
                                                      onFinish={handleNoConfirm}
                                                      layout="vertical"
                                                      form={form}
                                                      initialValues={{
                                                            description: "Xin chào, tôi rất quan tâm đến chuyến đi này nhưng tôi muốn thảo luận thêm về giá. Liệu có thể điều chỉnh mức giá phù hợp hơn không? Cảm ơn!"
                                                      }}
                                                >
                                                      <Form.Item label="Lời nhắn" name="description">
                                                            <Input.TextArea
                                                                  rows={4}
                                                                  style={{ marginBottom: '10px' }}
                                                            />
                                                      </Form.Item>
                                                      <Form.Item>
                                                            <Button type="primary" htmlType="submit">
                                                                  Gửi yêu cầu
                                                            </Button>
                                                      </Form.Item>
                                                </Form>
                                          </Modal>

                                          <Tooltip title="Hủy đặt chỗ chuyến đi này">
                                                <Popconfirm title="Bạn chắc chắn có muốn hủy đặt chỗ không?" onConfirm={handleCancelBooking}>
                                                      <Button color="primary" danger>Hủy đặt chỗ</Button>
                                                </Popconfirm>
                                          </Tooltip>
                                    </>
                              )
                        } else if (record.status === "Đã thanh toán") {
                              return (
                                    <>
                                          <Button type="primary" onClick={() => showModal()}>
                                                Hủy
                                          </Button>
                                          <CancelBooking record={record} isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} />
                                    </>
                              )
                        } else if (record.status === "Đã check-in") {
                              const relatedBill = bill.find(b => b.quotationId === record.quotationId);
                              const handleNoBuy = async () => {
                                    const getTimeCurrent = () => {
                                          return new Date().toLocaleString();
                                    };
                                    const quotationData = {
                                          "priceOffer": record.priceOffer,
                                          "status": "Khách hàng không mua cá",
                                          "approvedDate": getTimeCurrent(),
                                          "description": record.description,
                                    };
                                    const response = await put(`quotation/update/${record.quotationId}`, quotationData);
                                    if (response) {
                                          fetchApi();
                                          setIsModalVisible(false);
                                          navigate(`/my-orders/feedback/${record.userId}`);
                                    }
                              }
                              if (relatedBill.koiPrice > 0) {
                                    return (
                                          <Link to={`/my-orders/${relatedBill.billId}`}>
                                                <Button type="primary">
                                                      Xem chi tiết đơn hàng
                                                </Button>
                                          </Link>
                                    )
                              } else if (relatedBill) {
                                    return (
                                          <>
                                                <NavLink to={`/order-koi/${relatedBill.billId}`} state={{ tourId: record.tourId }} className="pr-10">
                                                      <Button type="primary">Mua cá nào</Button>
                                                </NavLink>
                                                <Button type="primary" onClick={() => showModal()}>Không mua cá</Button>
                                                <Modal
                                                      title="Xác nhận không mua cá"
                                                      open={isModalVisible}
                                                      onOk={handleNoBuy}
                                                      onCancel={handleCancel}
                                                >
                                                      <p>Bạn có chắc chắn không mua cá?</p>
                                                </Modal>
                                          </>

                                    );
                              }
                        } else {
                              return (
                                    <>
                                    </>
                              )
                        }
                  }
            },
      ];
      return (
            <>
                  <div className="booking-list-container">
                        <h2>Danh sách đặt chỗ</h2>
                        <Table columns={columns} dataSource={quotation} pagination={false} bordered />
                  </div>

            </>
      )
}
export default MyBooking;