import { Table, Button } from "antd";
import { useEffect, useState } from "react";
import { get } from "../../../utils/request";
import { PlusOutlined } from "@ant-design/icons";
import CreateKoiFarm from "./CreateKoiFarm";
import DeleteKoiFarm from "./DeleteKoiFarm";
import UpdateKoiFarm from "./UpdateKoiFarm";

function KoiFarmList() {
  const [farms, setFarms] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchApi = async () => {
    const response = await get("koiFarm/view-all");
    if (response) {
      setFarms(response);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
    fetchApi();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const handleReload = () => {
    fetchApi();
  };

  const columns = [
    {
      title: "Tên trang trại",
      dataIndex: "farmName",
      key: "farmName",
    },
    {
      title: "Giới thiệu",
      dataIndex: "introduction",
      key: "introduction",
      ellipsis: true,
    },
    {
      title: "Địa chỉ",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Giờ mở cửa",
      dataIndex: "openHour",
      key: "openHour",
      render: (text) =>
        text &&
        new Date(text).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
    {
      title: "Giờ đóng cửa",
      dataIndex: "closeHour",
      key: "closeHour",
      render: (text) =>
        text &&
        new Date(text).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Đánh giá",
      dataIndex: "rating",
      key: "rating",
      render: (text) => Number(text).toFixed(1),
    },
    {
      title: "Số điện thoại",
      dataIndex: "hotline",
      key: "hotline",
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <>
          <DeleteKoiFarm record={record} handleReload={handleReload} />
          <UpdateKoiFarm />
        </>
      ),
    },
  ];

  return (
    <>
      <Button icon={<PlusOutlined />} onClick={showModal}>
        Thêm trang trại cá Koi mới
      </Button>
      <CreateKoiFarm
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
      <div className="">
        <Table
          columns={columns}
          dataSource={farms}
          rowKey="farmId"
          bordered
          scroll={{ x: "max-content" }}
        />
      </div>
    </>
  );
}

export default KoiFarmList;
