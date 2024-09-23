import { Menu } from "antd";
import {AppstoreOutlined} from "@ant-design/icons";
import { Link } from "react-router-dom";
function MenuSider() {
      const items = [
            {
                  label: <Link to="/admin">Tổng quan</Link>,
                  icon: <AppstoreOutlined />,
                  key: "/admin"
            }
      ]
      return (
            <>
                  <Menu
                        mode="inline"
                        items={items}
                        defaultSelectedKeys={['/']}
                        defaultOpenKeys={["admin"]}
                  />
            </>
      )
}
export default MenuSider;