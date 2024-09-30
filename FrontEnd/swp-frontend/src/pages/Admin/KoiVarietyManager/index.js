import KoiVarietyList from "./KoiVarietyList";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons"
import CreateVariety from "./CreateVariety";
import { useState } from "react";

function KoiVarietyManager() {
      const [isModalVisible, setIsModalVisible] = useState(false);
      const showModal = () => {
            setIsModalVisible(true);
      };

      const handleOk = async () => {
            setIsModalVisible(false);
      };

      const handleCancel = () => {
            setIsModalVisible(false);
      };
      return (
            <>
                  <h1>Danh sách giống cá</h1>
                  <Button icon={<PlusOutlined />} onClick={showModal}>Thêm giống cá mới</Button>
                  <CreateVariety isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel}/>
                  <KoiVarietyList/>
            </>
      )
}
export default KoiVarietyManager;