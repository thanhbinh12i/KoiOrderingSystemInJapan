import { useEffect, useState } from "react";
import { get } from "../../utils/request";
import { Button, Table } from "antd";
import "./MyBooking.scss"
import { Link } from "react-router-dom";

function MyBooking() {
      const [quotation, setQuotation] = useState([]);
      const userId = localStorage.getItem("id");
      useEffect(() => {
            const fetchApi = async () => {
                  const response = await get(`quotation/view/${userId}`);
                  if (response) {
                        setQuotation(response);
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
                  render: (text) => (['Chờ xác nhận', 'Đã xác nhận', 'Đã thanh toán'].includes(text) ? text : "Chờ xác nhận"),
            },
            {
                  title: 'Hành động',
                  key: 'action',
                  render: (_, record) => (
                        record.status === "Đã xác nhận" && (
                              <Link to={`/pay-booking/${record.quotationId}`} state={{price: record.priceOffer}}>
                                    <Button type="primary">
                                          Thanh toán
                                    </Button>
                              </Link>

                        )
                  ),
            },
      ];
      return (
            <>
                  <div className="booking-list-container">
                        <h2>Danh sách đặt chỗ</h2>
                        <Table columns={columns} dataSource={quotation} pagination={false} />
                  </div>
            </>
      )
}
export default MyBooking;