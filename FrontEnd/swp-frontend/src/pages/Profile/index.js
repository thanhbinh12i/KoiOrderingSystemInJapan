import React from "react";
import { Layout } from "antd";
import "./App.scss";
import Sidebar from "./SideBar";

import { Outlet } from "react-router-dom";

const { Sider, Content } = Layout;

function Profile() {
  return (
    <Layout className="app-layout">
      <Sider width={250} theme="light">
        <Sidebar />
      </Sider>
      <Content>
        <div>
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
}

export default Profile;
