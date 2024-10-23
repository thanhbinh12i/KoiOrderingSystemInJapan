import { useEffect, useState } from "react";
import { get, put } from "../../utils/request";
import { Button, Table } from "antd";
import "./MyBooking.scss"
import { Link, NavLink } from "react-router-dom";
import CancelBooking from "./CancelBooking";

function MyBooking() {
      const [quotation, setQuotation] = useState([]);
      const [bill, setBill] = useState([]);
      const userId = localStorage.getItem("id");
      const [isModalVisible, setIsModalVisible] = useState(false);
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
                  setQuotation(response);
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
                  title: 'Tour',
                  dataIndex: 'tourId',
                  key: 'tourId',
            },
            {
                  title: 'Giá tiền',
                  dataIndex: 'priceOffer',
                  key: 'priceOffer',
                  // render: (_, record) => {
                  //       // if (record.status === "Đã xác nhận" || record.status === "Đã thanh toán" || record.status === "Đã check-in" || record.status === "Đang check-in") {
                  //       //       return record.priceOffer;
                  //       // } else {
                  //       //       return "Chưa xác nhận";
                  //       // }

                  // }
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
                  render: (text) => (['Chờ xác nhận', 'Đã xác nhận', 'Đã thanh toán', "Đã check-in", "Đang check-in", "Đã hủy"].includes(text) ? text : "Chờ xác nhận"),
            },
            {
                  title: 'Hành động',
                  key: 'action',
                  render: (_, record) => {
                        if (record.status === "Đã xác nhận") {
                              return (
                                    <>
                                          <Link to={`/pay-booking/${record.quotationId}`} state={{ price: record.priceOffer }}>
                                                <Button type="primary">
                                                      Thanh toán
                                                </Button>
                                          </Link>
                                    </>
                              )
                        } else if (record.status === "Đã thanh toán") {
                              const handleCheckIn = async () => {
                                    const getTimeCurrent = () => {
                                          return new Date().toLocaleString();
                                    };
                                    const quotationData = {
                                          "priceOffer": record.priceOffer,
                                          "status": "Đang check-in",
                                          "approvedDate": getTimeCurrent(),
                                          "description": record.description,
                                    };
                                    const response = await put(`quotation/update/${record.quotationId}`, quotationData);
                                    if (response) {
                                          fetchApi();
                                    }
                              }
                              return (
                                    <>
                                          <Button type="primary" onClick={handleCheckIn}>
                                                Check - in máy bay
                                          </Button>
                                          <Button type="primary" onClick={() => showModal()}>
                                                Hủy
                                          </Button>
                                          <CancelBooking record={record} isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} />
                                    </>
                              )
                        } else if (record.status === "Đã check-in") {
                              const relatedBill = bill.find(b => b.quotationId === record.quotationId);
                              if (relatedBill && relatedBill.price > record.priceOffer) {
                                    return (
                                          <Button type="primary">Xem chi tiết</Button>
                                    )
                              } else if (relatedBill) {
                                    //đéo mua cá thì in ra bill detail luôn
                                    //cập nhật status là đéo mua cá
                                    return (
                                          <>
                                                <NavLink to={`/order-koi/${relatedBill.billId}`} state={{ tourId: record.tourId }}>
                                                      <Button type="primary">Mua cá nào</Button>
                                                </NavLink>
                                                
                                                <Button type="primary">Đéo mua cá</Button>
                                          </>

                                    );
                              }
                        } else {
                              return (
                                    <></>
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