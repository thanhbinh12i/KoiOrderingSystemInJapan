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
      setTours(response.reverse());
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

  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('-');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }

  const today = new Date();
  const fourDaysLater = new Date(today);
  fourDaysLater.setDate(today.getDate() + 4);

  const filteredTours = tours.filter(
    (tour) =>
      tour.tourDestinations &&
      tour.tourDestinations.some((dest) => dest.type === "default" && dest.tourId === tour.tourId)
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
            <Tooltip title="Xem chi tiết chuyến đi">
              <Button icon={<EyeOutlined />}></Button>
            </Tooltip>
          </Link>
          {
            parseDate(record.startTime).getTime() > fourDaysLater.getTime() && (
              <>
                <DeleteTour record={record} handleReload={fetchApi} />
                <Link to={`/tour-update/${record.tourId}`}>
                  <Tooltip title="Cập nhật chuyến đi">
                    <Button icon={<EditOutlined />}></Button>
                  </Tooltip>
                </Link>
              </>
            )
          }

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
