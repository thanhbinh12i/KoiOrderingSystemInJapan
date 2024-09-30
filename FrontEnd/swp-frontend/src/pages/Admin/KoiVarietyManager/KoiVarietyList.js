import { Table, Button } from "antd"
import { useEffect, useState } from "react";
import { get } from "../../../utils/request";
import { PlusOutlined } from "@ant-design/icons"
import CreateVariety from "./CreateVariety";
import DeleteVariety from "./DeleteVariety";

function KoiVarietyList() {
      const [varieties, setVarieties] = useState([]);
      const [isModalVisible, setIsModalVisible] = useState(false);
      const fetchApi = async () => {
            const response = await get("koi-variable/view-all");
            if (response) {
                  setVarieties(response);
            }
      }
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
      }, [])
      const handleReload = () => {
            fetchApi();
      }
      const column = [
            {
                  title: "Tên giống cá",
                  dataIndex: "varietyName",
                  key: "varietyName",
            },
            {
                  title: "Màu sắc",
                  dataIndex: "color",
                  key: "color",
            },
            {
                  title: "Hành động",
                  key: "actions",
                  render: (_, record) => (
                        <>
                              <DeleteVariety record={record} handleReload={handleReload} />
                        </>
                  )
            }


      ]
      return (
            <>
                  <Button icon={<PlusOutlined />} onClick={showModal}>Thêm giống cá mới</Button>
                  <CreateVariety isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} />
                  <div className="">
                        <Table columns={column} dataSource={varieties} rowKey="VarietyId" bordered/>
                  </div>
            </>
      )
}
export default KoiVarietyList;