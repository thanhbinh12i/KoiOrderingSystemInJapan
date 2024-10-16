import { Layout } from "antd";
import "./LayoutAdmin.scss";
import {
  MenuUnfoldOutlined,
  BellOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Avatar, Dropdown, Menu } from "antd";
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import MenuSider from "./MenuSider";
import logo from "../../assets/logo.jpg";
const { Sider, Content } = Layout;

function LayoutAdmin() {
  const [collapse, setCollapse] = useState(false);
  const userMenu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="/profile">Hồ sơ</Link>
      </Menu.Item>
      <Menu.Item key="settings">
        <Link to="/settings">Cài đặt</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <Link to="/logout">Đăng xuất</Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Layout>
        <header className="header">
          <div
            className={"header__logo " + (collapse && "header__logo--collapse")}
          >
            <Link to="/">
              <img
                width={collapse ? 80 : 120}
                height={collapse ? 70 : 85}
                src={logo}
                alt=""
                className=""
              />
            </Link>
          </div>
          <div className="header__nav">
            <div className="header__nav-left">
              <div
                className="header__collapse"
                onClick={() => setCollapse(!collapse)}
              >
                <MenuUnfoldOutlined />
              </div>
            </div>
            <div className="header__nav-right">
              <NavLink
                to="/"
                className="header__nav-link"
                activeClassName="header__nav-link--active"
              >
                Trang chủ
              </NavLink>
              <Badge count={5} className="header__nav-notification">
                <BellOutlined style={{ fontSize: "20px" }} />
              </Badge>
              <Dropdown overlay={userMenu} trigger={["click"]}>
                <Avatar
                  icon={<UserOutlined />}
                  className="header__nav-avatar"
                />
              </Dropdown>
            </div>
          </div>
        </header>
        <Layout>
          <Sider className="sider" collapsed={collapse} theme="light" width={250}>
            <MenuSider />
          </Sider>
          <Content className="content">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
export default LayoutAdmin;
