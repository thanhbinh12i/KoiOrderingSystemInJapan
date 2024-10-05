import { Table, Button } from "antd"
import { useEffect, useState } from "react";
import { get } from "../../../utils/request";
import { PlusOutlined } from "@ant-design/icons"
import CreateVariety from "./CreateVariety";
import DeleteVariety from "./DeleteVariety";
import SearchVariety from "./SearchVariety";
import "./KoiVariety.scss"

function KoiVarietyList() {
      const [varieties, setVarieties] = useState([]);
      const [isModalVisible, setIsModalVisible] = useState(false);
      const [filterVarieties, setFilterVarieties] = useState(varieties);
      const fetchApi = async () => {
            const response = await get("koi-variable/view-all");
            if (response) {
                  setVarieties(response);
            }
      }
      const handleSearch = (searchVariety) => {
            const filterData = varieties.filter((variety) =>
                  variety.varietyName.toLowerCase().includes(searchVariety.toLowerCase())
            );
            setFilterVarieties(filterData);
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
                  <div className="koi-variety">
                        <div className="koi-variety__search-create">
                              <Button icon={<PlusOutlined />} onClick={showModal} className="create-button">Thêm giống cá mới</Button>
                              <CreateVariety isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} />
                              <SearchVariety onSearch={handleSearch} className="search-button" />
                        </div>
                        <div className="koi-varitety__table">
                              <Table columns={column} dataSource={filterVarieties} rowKey="VarietyId" bordered />
                        </div>
                  </div>
            </>
      )
}
export default KoiVarietyList;