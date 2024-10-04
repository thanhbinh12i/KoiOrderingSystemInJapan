import React, { useEffect, useState, useCallback } from "react";
import { Table, Button, message, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { get } from "../../../utils/request";
import CreateTour from "./CreateTour";
import DeleteTour from "./DeleteTour";
import UpdateTour from "./UpdateTour";
import SearchByName from "./SearchByName";
import "./Tour.scss";

function TourList() {
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
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

  const showModal = () => setIsModalVisible(true);
  const handleOk = () => {
    setIsModalVisible(false);
    fetchApi();
  };
  const handleCancel = () => setIsModalVisible(false);

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
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <>
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
          <Button
            icon={<PlusOutlined />}
            onClick={showModal}
            className="create-button"
            style={{ marginBottom: 16 }}
          >
            Thêm tour mới
          </Button>
          <CreateTour
            isModalVisible={isModalVisible}
            handleOk={handleOk}
            handleCancel={handleCancel}
          />
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
