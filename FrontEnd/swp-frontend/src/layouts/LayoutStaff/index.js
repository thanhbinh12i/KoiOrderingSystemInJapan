import React from 'react';
import { Layout, Menu, Avatar } from 'antd';
import { UserOutlined, MessageOutlined, FileTextOutlined, TeamOutlined, NotificationOutlined, LogoutOutlined } from '@ant-design/icons';
import "./LayoutStaff.scss";
import { Link, Outlet } from 'react-router-dom';

const { Sider, Content } = Layout;

function LayoutStaff() {
      return (
            <>
                  <Layout className="app-layout">
                        <Sider width={200} className="app-sider">
                              <div className="logo">
                                    <Avatar icon={<UserOutlined />} />
                                    <p>Sale Staff</p>
                              </div>
                              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                                    <Menu.Item key="1" icon={<TeamOutlined />}>
                                          Thông tin nhân viên
                                    </Menu.Item>
                                    <Menu.Item key="2" icon={<NotificationOutlined />}>
                                          <Link to="/staff/quotation-staff">Thông báo đặt chỗ</Link>
                                    </Menu.Item>
                                    <Menu.Item key="3" icon={<MessageOutlined />}>
                                          Tin nhắn
                                    </Menu.Item>
                                    <Menu.Item key="4" icon={<FileTextOutlined />}>
                                          Báo giá
                                    </Menu.Item>
                                    <Menu.Item key="5" icon={<LogoutOutlined />}>
                                          Đăng xuất
                                    </Menu.Item>
                              </Menu>
                        </Sider>
                        <Layout>
                              <Content className="app-content">
                                    <Outlet />
                              </Content>
                        </Layout>
                  </Layout>
            </>
      )
}
export default LayoutStaff;