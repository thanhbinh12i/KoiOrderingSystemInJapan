import { useEffect, useState } from "react";
import { get } from "../../utils/request";
import { Button, Table } from "antd";
import "./MyBooking.scss"
import { Link, NavLink } from "react-router-dom";

function MyBooking() {
      const [quotation, setQuotation] = useState([]);
      const [bill, setBill] = useState([]);
      const userId = localStorage.getItem("id");
      useEffect(() => {
            const fetchApi = async () => {
                  const response = await get(`quotation/view/${userId}`);
                  if (response) {
                        setQuotation(response);
                  }
            }
            fetchApi();
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
                  render: (_, record) => {
                        if (record.status === "Đã xác nhận" || record.status === "Đã thanh toán") {
                              return record.priceOffer;
                        } else {
                              return "Chưa xác nhận";
                        }
                  }
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
                  render: (text) => (['Chờ xác nhận', 'Đã xác nhận', 'Đã thanh toán', "Đã check-in"].includes(text) ? text : "Chờ xác nhận"),
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
                              return (
                                    <>
                                          <Button type="primary">
                                                Check - in máy bay
                                          </Button>
                                    </>
                              )
                        } else if (record.status === "Đã check-in") {
                              const relatedBill = bill.find(b => b.quotationId === record.quotationId);
                              if (relatedBill && relatedBill.price > record.priceOffer) {
                                    return (
                                          <Button type="primary">Xem chi tiết</Button>
                                    )
                              } else if (relatedBill) {
                                    return (
                                          <NavLink to={`/order-koi/${relatedBill.billId}`} state={{ tourId: record.tourId }}>
                                                <Button type="primary">Mua cá nào</Button>
                                          </NavLink>
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