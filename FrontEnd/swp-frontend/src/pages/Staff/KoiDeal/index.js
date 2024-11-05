import { useEffect, useState } from "react";
import { get } from "../../../utils/request";
import { Button, Table } from "antd";
import { Link } from "react-router-dom";

function KoiDeal() {
      const [bill, setBill] = useState([]);

      useEffect(() => {
            const fetchApi = async () => {
                  const billResponse = await get("bill/view-all");
                  if (billResponse) {
                        const [tours, quotations] = await Promise.all([
                              Promise.all(billResponse.map(bill => get(`tour/view-tourId/${bill.quotationId}`))),
                              Promise.all(billResponse.map(bill => get(`quotation/view/${bill.quotationId}`)))
                        ]);

                        const bill = billResponse.map((bill, index) => ({
                              ...bill,
                              tour: tours[index],
                              quotation: quotations[index]
                        }))
                              .filter(bill => bill.quotation?.status === "Đã check-in") 
                              .reverse();

                        setBill(bill);
                  }
            }
            fetchApi();
      }, [])
      const columns = [
            {
                  title: 'Id',
                  dataIndex: 'billId',
                  key: 'billId',
            },
            {
                  title: 'Họ và tên',
                  dataIndex: 'userFullName',
                  key: 'userFullName',
            },
            {
                  title: 'Tên tour',
                  key: 'tourName',
                  render: (_, record) => record.tour?.tourName
            },
            {
                  title: 'Ngày khởi hành',
                  key: 'startDate',
                  render: (_, record) => record.tour?.startTime
            },
            {
                  title: 'Hành động',
                  key: 'action',
                  render: (_, record) => (
                        <>
                              <Link to={`${record.billId}`}>
                                    <Button>Xem chi tiết đơn hàng</Button>
                              </Link>
                        </>

                  )
            },
      ];
      return (
            <>
                  <div>
                        <h1>Danh sách các giao dịch</h1>
                        <Table dataSource={bill} columns={columns} bordered />
                  </div>
            </>
      )
}
export default KoiDeal;