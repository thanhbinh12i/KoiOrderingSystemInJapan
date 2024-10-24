import { useEffect, useState } from "react";
import { get } from "../../../utils/request";
import { Button, Table } from "antd";
import { Link } from "react-router-dom";

function KoiDeal() {
      const [bill, setBill] = useState([]);
      useEffect(() => {
            const fetchApi = async () => {
                  const response = await get("bill/view-all");
                  if (response) {
                        setBill(response);
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
                  title: 'Email',
                  dataIndex: 'email',
                  key: 'email',
            },
            {
                  title: 'Số điện thoại',
                  dataIndex: 'phoneNumber',
                  key: 'phoneNumber',
            },
            {
                  title: 'Hành động',
                  key: 'action',
                  render: (_, record) => (
                        <>
                              <Link to={`${record.billId}`}>
                                    <Button>Xem chi tiết</Button>
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