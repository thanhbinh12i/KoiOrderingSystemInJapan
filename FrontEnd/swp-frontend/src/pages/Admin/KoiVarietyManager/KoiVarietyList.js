import { Table, Button, Tooltip } from "antd"
import { useEffect, useState } from "react";
import { get } from "../../../utils/request";
import { PlusOutlined, EyeOutlined } from "@ant-design/icons"
import CreateVariety from "./CreateVariety";
import DeleteVariety from "./DeleteVariety";
import SearchVariety from "./SearchVariety";
import "./KoiVariety.scss"
import VarietyDetail from "./VarietyDetail";

function KoiVarietyList() {
      const [varieties, setVarieties] = useState([]);
      const [filterVarieties, setFilterVarieties] = useState([]);
      const [modalState, setModalState] = useState({
            isVisible: false,
            type: null,
            selectedRecord: null
      });

      const fetchApi = async () => {
            const response = await get("koi-variable/view-all");
            if (response) {
                  setVarieties(response)
            }
      };

      useEffect(() => {
            fetchApi();
      }, []);

      const handleSearch = (searchVariety) => {
            const filterData = varieties.filter((variety) =>
                  variety.varietyName.toLowerCase().includes(searchVariety.toLowerCase())
            );
            setFilterVarieties(filterData);
      };

      const showModal = (type, record = null) => {
            setModalState({
                  isVisible: true,
                  type: type,
                  selectedRecord: record
            });
      };

      const handleCancel = () => {
            setModalState({
                  isVisible: false,
                  type: null,
                  selectedRecord: null
            });
      };

      const handleOk = async () => {
            handleCancel();
            fetchApi();
      };

      const handleReload = () => {
            fetchApi();
      };

      const columns = [
            {
                  title: "ID",
                  dataIndex: "varietyId",
                  key: "varietyId",
            },
            {
                  title: "Tên giống cá",
                  dataIndex: "varietyName",
                  key: "varietyName",
            },
            {
                  title: "Hành động",
                  key: "actions",
                  render: (_, record) => (
                        <>
                              <Tooltip title="Xem chi tiết">
                                    <Button onClick={() => showModal('detail', record)} icon={<EyeOutlined />} />
                              </Tooltip>
                              <DeleteVariety record={record} handleReload={handleReload} />
                        </>
                  )
            }
      ];

      return (
            <div className="koi-variety">
                  <div className="koi-variety__search-create">
                        <Button icon={<PlusOutlined />} onClick={() => showModal('create')} className="create-button">
                              Thêm giống cá mới
                        </Button>
                        <SearchVariety onSearch={handleSearch} className="search-button" />
                  </div>
                  <div className="koi-varitety__table">
                        <Table columns={columns} dataSource={filterVarieties} rowKey="varietyId" bordered />
                  </div>

                  {modalState.isVisible && modalState.type === 'create' && (
                        <CreateVariety
                              isModalVisible={modalState.isVisible}
                              handleOk={handleOk}
                              handleCancel={handleCancel}
                        />
                  )}

                  {modalState.isVisible && modalState.type === 'detail' && (
                        <VarietyDetail
                              isModalVisible={modalState.isVisible}
                              handleCancel={handleCancel}
                              record={modalState.selectedRecord}
                        />
                  )}
            </div>
      );
}
export default KoiVarietyList;