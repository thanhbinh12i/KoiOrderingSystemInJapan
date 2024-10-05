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
                  label: "Quản lí trang trại",
                  icon: <AppstoreOutlined />,
                  key: "/farm-manager",
                  children: [
                        {
                              label: <Link to="/farm-manager">Danh sách trang trại</Link>,
                              icon: <OrderedListOutlined />,
                              key: "/farm-list"
                        },
                        {
                              label: <Link to="/create-farm">Thêm trang trại</Link>,
                              icon: <PlusOutlined />,
                              key: "/create-farm"
                        }
                  ]
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
            {
                  label: "Quản lí tour",
                  icon: <AppstoreOutlined />,
                  key: "/tour-manager",
                  children: [
                        {
                              label: <Link to="/tour-manager">Danh sách tour</Link>,
                              icon: <OrderedListOutlined />,
                              key: "/tour-list"
                        },
                        {
                              label: <Link to="/create-tour">Thêm tour mới</Link>,
                              icon: <PlusOutlined />,
                              key: "/create-tour"
                        }
                  ]
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
