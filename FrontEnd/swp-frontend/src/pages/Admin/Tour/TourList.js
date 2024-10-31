import React, { useEffect, useState } from "react";
import { Table, message, Button, Tooltip, Spin } from "antd";
import { get } from "../../../utils/request";
import DeleteTour from "./DeleteTour";
import { EditOutlined } from "@ant-design/icons";
import SearchByName from "./SearchByName";
import "./Tour.scss";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function TourList() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchApi = async () => {
    setLoading(true);
    try {
      const response = await get("tour/view-all");
      setTours(response);
    } catch (error) {
      message.error("Failed to load tours. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
    // eslint-disable-next-line
  }, []);

  const filteredTours = tours.filter(
    (tour) =>
      tour.tourDestinations?.some(
        (dest) => dest.type === "default" && dest.tourId === tour.tourId
      ) &&
      tour.tourName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (value) => {
    setSearchQuery(value);
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
      render: (_, record) => (
        <strong>{record.price.toLocaleString()}</strong>
      )
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
          <Link to={`/tour-update/${record.tourId}`}>
            <Tooltip title="Update tour">
              <Button icon={<EditOutlined />}></Button>
            </Tooltip>
          </Link>
        </>
      ),
    },
  ];

  return (
    <>
      {loading ? (
        <Spin tip="Loading..." />
      ) : (
        <>
          <div className="tour">
            <div className="tour__search-create">
              <SearchByName onSearch={handleSearch} className="search-button" />
            </div>
            <div className="tour__table">
              <Table
                columns={columns}
                dataSource={filteredTours}
                rowKey="tourId"
                bordered
                scroll={{ x: "max-content" }}
              />
            </div>
          </div>
        </>
      )}

    </>
  );
}

export default TourList;
