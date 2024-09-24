import React from "react";
import { Layout } from "antd";
import "./App.scss";
import Sidebar from "./SideBar";
import MainContent from "./MainContent";

const { Sider, Content } = Layout;

function Profile() {
  return (
    <Layout className="app-layout">
      <Sider width={250} theme="light">
        <Sidebar />
      </Sider>
      <Content>
        <MainContent />
      </Content>
    </Layout>
  );
}

export default Profile;
