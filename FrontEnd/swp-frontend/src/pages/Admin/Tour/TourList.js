import React, { useEffect, useState, useCallback } from "react";
import { Table, message, Spin, Button, Tooltip } from "antd";
import { get } from "../../../utils/request";
import DeleteTour from "./DeleteTour";
import UpdateTour from "./UpdateTour";
import SearchByName from "./SearchByName";
import "./Tour.scss";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function TourList() {
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchApi = useCallback(async () => {
    setLoading(true);
    try {
      const response = await get("tour/view-all");
      setTours(response);
      setFilteredTours(response);
    } catch (error) {
      console.error("Error fetching tours:", error);
      message.error("Failed to load tours. Please try again.");
      setTours([]);
      setFilteredTours([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  const handleSearch = (value) => {
    if (value) {
      const filtered = tours.filter((tour) =>
        tour.tourName.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredTours(filtered);
    } else {
      setFilteredTours(tours);
    }
  };

  const columns = [
    {
      title: "Tên tour",
      dataIndex: "tourName",
      key: "tourName",
    },
    {
      title: "Giá (nghìn VND)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "finishTime",
      key: "finishTime",
    },
    {
      title: "Số lượng người tham gia",
      dataIndex: "numberOfParticipate",
      key: "numberOfParticipate",
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <>
          <Link to={`/tour-detail/${record.tourId}`}>
            <Tooltip title="Xem chi tiết">
              <Button icon={<EyeOutlined />}></Button>
            </Tooltip>
          </Link>
          <DeleteTour record={record} handleReload={fetchApi} />
          <UpdateTour record={record} reload={fetchApi} />
        </>
      ),
    },
  ];

  return (
    <>
      <div className="tour">
        <div className="tour__search-create">
          <SearchByName onSearch={handleSearch} className="search-button" />
        </div>
        <div className="tour__table">
          <Spin spinning={loading}>
            <Table
              columns={columns}
              dataSource={filteredTours}
              rowKey="id"
              bordered
              scroll={{ x: "max-content" }}
            />
          </Spin>
        </div>
      </div>
    </>
  );
}

export default TourList;
