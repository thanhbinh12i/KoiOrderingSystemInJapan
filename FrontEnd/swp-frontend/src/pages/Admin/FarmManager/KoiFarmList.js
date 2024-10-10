import React, { useEffect, useState, useCallback } from "react";
import { Table, message, Spin } from "antd";
import { Tooltip, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { get } from "../../../utils/request";
import DeleteKoiFarm from "./DeleteKoiFarm";
import UpdateKoiFarm from "./UpdateKoiFarm";
import SearchByNameOrLocation from "./SearchByNameOrLocation";
import "../FarmManager/KoiFarm.scss";
import { Link } from "react-router-dom";

function KoiFarmList() {
  const [farms, setFarms] = useState([]);
  const [filteredFarms, setFilteredFarms] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchApi = useCallback(async () => {
    setLoading(true);
    try {
      const response = await get("koiFarm/view-all");
      setFarms(response);
      setFilteredFarms(response);
    } catch (error) {
      console.error("Error fetching koi farms:", error);
      message.error("Failed to load koi farms. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  const handleSearch = (value) => {
    const lowercasedValue = value.toLowerCase();
    const filtered = farms.filter(
      (farm) =>
        farm.farmName.toLowerCase().includes(lowercasedValue) ||
        farm.location.toLowerCase().includes(lowercasedValue)
    );
    setFilteredFarms(filtered);
  };

  const columns = [
    { title: "Tên trang trại", dataIndex: "farmName", key: "farmName" },
    { title: "Địa chỉ", dataIndex: "location", key: "location" },
    {
      title: "Giờ mở cửa",
      dataIndex: "openHour",
      key: "openHour",
      render: (text) => text || "N/A",
    },
    {
      title: "Giờ đóng cửa",
      dataIndex: "closeHour",
      key: "closeHour",
      render: (text) => text || "N/A",
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Số điện thoại", dataIndex: "hotline", key: "hotline" },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <>
          <Link to={`/farm-detail/${record.farmId}`}>
            <Tooltip title="Xem chi tiết">
              <Button icon={<EyeOutlined />}></Button>
            </Tooltip>
          </Link>
          <DeleteKoiFarm record={record} handleReload={fetchApi} />
          <UpdateKoiFarm record={record} reload={fetchApi} />
        </>
      ),
    },
  ];

  return (
    <div className="koiFarm">
      <div className="koiFarm__search-create">
        <SearchByNameOrLocation
          onSearch={handleSearch}
          className="search-button"
        />
      </div>
      <div className="koiFarm__table">
        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={filteredFarms}
            rowKey="farmId"
            bordered
            scroll={{ x: "max-content" }}
          />
        </Spin>
      </div>
    </div>
  );
}

export default KoiFarmList;
