import { Button, Table, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { get } from "../../../utils/request";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import UpdateService from "./UpdateService";
import DeleteService from "./DeleteService";
import CreateService from "./CreateService";
import ServiceDetail from "./ServiceDetail";

function ServiceList() {
  const [services, setServices] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

  const fetchApi = async () => {
    const response = await get("delivery/view-all");
    if (response) {
      setServices(response);
    }
  };
  const showModal = () => {
    setIsModalVisible(true);
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
  const showModalDetail = () => {
    setIsDetailModalVisible(true);
  };

  const handleCancelDetail = () => {
    setIsDetailModalVisible(false);
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "deliveryId",
      key: "deliveryId",
    },
    {
      title: "Type",
      dataIndex: "deliveryType",
      key: "deliveryType",
    },
    {
      title: "Phí vận chuyển",
      dataIndex: "deliveryFee",
      key: "deliveryFee",
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <>
          <Tooltip title="Xem chi tiết">
            <Button icon={<EyeOutlined />} onClick={showModalDetail}></Button>
            <ServiceDetail
              isModalVisible={isDetailModalVisible}
              handleCancel={handleCancelDetail}
              record={record}
            />
          </Tooltip>
          <UpdateService record={record} handleReload={handleReload} />
          <DeleteService record={record} handleReload={handleReload} />
        </>
      ),
    },
  ];
  return (
    <>
      <div className="service-create">
        <Button
          icon={<PlusOutlined />}
          onClick={showModal}
          className="create-button"
        >
          Thêm dịch vụ vận chuyển mới
        </Button>
        <CreateService
          isModalVisible={isModalVisible}
          handleReload={handleReload}
          handleCancel={handleCancel}
        />
      </div>
      <Table columns={columns} dataSource={services} bordered />
    </>
  );
}
export default ServiceList;
