import { Menu } from "antd";
import { AppstoreOutlined, PlusOutlined, OrderedListOutlined  } from "@ant-design/icons";
import { Link } from "react-router-dom";
function MenuSider() {
      const items = [
            {
                  label: <Link to="/admin">Tổng quan</Link>,
                  icon: <AppstoreOutlined />,
                  key: "/admin"
            },
            {
                  label: <Link to="/user-manager">Quản lí người dùng</Link>,
                  icon: <AppstoreOutlined />,
                  key: "/user-manager"
            },
            // {
            //       label: <Link to="/staff-manager">Quản lí nhân sự</Link>,
            //       icon: <AppstoreOutlined />,
            //       key: "/staff-manager"
            // },
            {
                  label: <Link to="/farm-manager">Quản lí trang trại</Link>,
                  icon: <AppstoreOutlined />,
                  key: "/farm-manager"
            },
            {
                  label: <Link to="/koivariety-manager">Quản lí giống cá</Link>,
                  icon: <AppstoreOutlined />,
                  key: "/koivariety-manager"
            },
            {
                  label: "Quản lí cá koi",
                  icon: <AppstoreOutlined />,
                  key: "/koi-manager",
                  children: [
                        {
                              label: <Link to="/koi-manager">Danh sách cá koi</Link>,
                              icon: <OrderedListOutlined />,
                              key: "/koi-list"
                        },
                        {
                              label: <Link to="/create-koi">Thêm cá koi</Link>,
                              icon: <PlusOutlined />,
                              key: "/create-koi"
                        }
                  ]
            },
            {
                  label: <Link to="/service-manager">Quản lí dịch vụ</Link>,
                  icon: <AppstoreOutlined />,
                  key: "/service-manager"
            },
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