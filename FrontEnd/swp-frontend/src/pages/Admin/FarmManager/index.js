import { Link } from "react-router-dom";
import FarmList from "./FarmList";
import { PlusOutlined } from "@ant-design/icons"
import { Button } from "antd";

function FarmManager() {
      return (
            <>
                  <h1>Danh sách các trang trại</h1>
                  <Link to="/create-farm">
                        <Button icon={<PlusOutlined />}>Thêm trang trại mới</Button>
                  </Link>
                  <FarmList/>
            </>
      )
}
export default FarmManager;