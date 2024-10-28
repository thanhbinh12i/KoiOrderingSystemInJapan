import { Table } from "antd";
import { useEffect, useState } from "react";
import { get } from "../../../utils/request";

function BillList() {
  const [billData, setBillData] = useState([]);
  const fetchApi = async () => {
    try {
      const response = await get("bill/view-all");
      if (response) {
        const updatedData = response.map((bill) => ({
          ...bill,
          total: (bill.tourPrice || 0) + (bill.koiPrice || 0),
        }));
        setBillData(updatedData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchApi();
    // eslint-disable-next-line
  }, []);

  const columns = [
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Tên người dùng",
      dataIndex: "userFullName",
      key: "userFullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Ngày thanh toán",
      dataIndex: "paymentDate",
      key: "paymentDate",
    },
    {
      title: "Chi phí chuyến đi",
      dataIndex: "tourPrice",
      key: "tourPrice",
    },
    {
      title: "Chi phí cá koi",
      dataIndex: "koiPrice",
      key: "koiPrice",
    },
    {
      title: "Tổng phí thanh toán",
      dataIndex: "total",
      key: "total",
    },
  ];

  return (
    <Table
      dataSource={billData}
      columns={columns}
      rowKey="userId"
      pagination={false}
      bordered
    />
  );
}

export default BillList;
