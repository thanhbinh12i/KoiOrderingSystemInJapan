import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { get } from "../../../utils/request";
const StaffList = () => {
  const [personalInfo, setPersonalInfo] = useState([]);

  const fetchPersonalInfo = async () => {
    try {
      const response = await get("account/view-all-staff");
      setPersonalInfo(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchPersonalInfo();
    // eslint-disable-next-line
  }, []);

  const columns = [
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ];

  return (
    <Table
      dataSource={personalInfo}
      columns={columns}
      rowKey="userId"
      pagination={false}
      bordered
    />
  );
};

export default StaffList;
