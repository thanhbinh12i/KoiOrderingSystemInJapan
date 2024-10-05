import { Button, Table, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { get } from "../../../utils/request";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import UpdateService from "./UpdateService";
import DeleteService from "./DeleteService";
import CreateService from "./CreateService";

function ServiceList() {
      const [services, setServices] = useState([]);
      const [isModalVisible, setIsModalVisible] = useState(false);
      const fetchApi = async () => {
            const response = await get("service/view-all");
            if (response) {
                  setServices(response);
            }
      }
      const showModal = () => {
            setIsModalVisible(true);
      };

      const handleCancel = () => {
            setIsModalVisible(false);
      };
      useEffect(() => {
            fetchApi();
      }, [])
      const handleReload = () => {
            fetchApi();
      }
      const columns = [
            {
                  title: "ID",
                  dataIndex: "serviceId",
                  key: "serviceId",
            },
            {
                  title: "Dịch vụ",
                  dataIndex: "serviceName",
                  key: "serviceName",
            },
            {
                  title: "Giá",
                  dataIndex: "price",
                  key: "price"
            },
            {
                  title: "Hành động",
                  key: "actions",
                  render: (_, record) => (
                        <>
                              <Tooltip title="Xem chi tiết">
                                    <Button icon={<EyeOutlined />}></Button>
                              </Tooltip>
                              <UpdateService record={record} handleReload={handleReload} />
                              <DeleteService record={record} handleReload={handleReload} />
                        </>
                  )
            }
      ]
      return (
            <>
                  <div className="service-create">
                        <Button icon={<PlusOutlined />} onClick={showModal} className="create-button">Thêm dịch vụ mới</Button>
                        <CreateService isModalVisible={isModalVisible} handleReload={handleReload} handleCancel={handleCancel} />
                  </div>
                  <Table columns={columns} dataSource={services} bordered />
            </>
      )
}
export default ServiceList;