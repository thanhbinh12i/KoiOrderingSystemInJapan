import { Layout } from "antd";
import "./LayoutAdmin.scss";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import MenuSider from "./MenuSider";
import logo from "../../assets/logo.jpg";
const { Sider, Content } = Layout;


function LayoutAdmin() {
      const [collapse, setCollapse] = useState(false);
      return (
            <>
                  <Layout>
                        <header className="header">
                              <div className={"header__logo " + (collapse && "header__logo--collapse")}>
                                    <Link to="/">
                                          <img width={collapse ? 80 : 120} height={collapse ? 70 : 85} src={logo} alt="" className="" />
                                    </Link>
                              </div>
                              <div className="header__nav">
                                    <div className="header__nav-left">
                                          <div className="header__collapse" onClick={() => setCollapse(!collapse)}>
                                                <MenuUnfoldOutlined />
                                          </div>
                                    </div>
                                    <div className="header__nav-right">
                                          <NavLink to="/">Trang chủ</NavLink>
                                    </div>
                              </div>
                        </header>
                        <Layout>
                              <Sider className="sider" collapsed={collapse} theme="light">
                                    <MenuSider />
                              </Sider>
                              <Content className="content">
                                    <Outlet />
                              </Content>
                        </Layout>
                  </Layout>
            </>
      )
}
export default LayoutAdmin;