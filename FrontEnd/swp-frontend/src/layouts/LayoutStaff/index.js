import React from 'react';
import { Layout, Menu, Avatar } from 'antd';
import { UserOutlined, MessageOutlined, FileTextOutlined, TeamOutlined, NotificationOutlined, LogoutOutlined } from '@ant-design/icons';
import "./LayoutStaff.scss";
import { Link, Outlet } from 'react-router-dom';

const { Sider, Content } = Layout;

function LayoutStaff() {
      const role = localStorage.getItem('role');
      return (
            <>
                  <Layout className="app-layout">
                        <Sider width={200} className="app-sider">
                              <div className="logo">
                                    <Avatar icon={<UserOutlined />} />
                                    <p>{role}</p>
                              </div>
                              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                                    <Menu.Item key="1" icon={<TeamOutlined />}>
                                          Thông tin nhân viên
                                    </Menu.Item>
                                    {role === "SalesStaff" && (
                                          <>
                                                <Menu.Item key="2" icon={<NotificationOutlined />}>
                                                      <Link to="/staff/quotation-staff">Thông báo đặt chỗ</Link>
                                                </Menu.Item>
                                          </>
                                    )}
                                    {role === "ConsultingStaff" && (
                                          <>
                                                <Menu.Item key="2" icon={<NotificationOutlined />}>
                                                      <Link to="/staff/koi-deal-staff">Deal giá koi</Link>
                                                </Menu.Item>
                                                <Menu.Item key="3" icon={<MessageOutlined />}>
                                                      <Link to="/staff/koi-eliminated-date">Xác nhận ngày giao hàng</Link>
                                                </Menu.Item>
                                          </>
                                    )}
                                    {role === "DeliveringStaff" && (
                                          <>
                                                <Menu.Item key="2" icon={<NotificationOutlined />}>
                                                      <Link to="/staff/koi-delivery-date">Cập nhật giao hàng</Link>
                                                </Menu.Item>
                                          </>
                                    )}

                                    <Menu.Item key="4" icon={<MessageOutlined />}>
                                          Tin nhắn
                                    </Menu.Item>
                                    <Menu.Item key="5" icon={<FileTextOutlined />}>
                                          Báo giá
                                    </Menu.Item>
                                    <Menu.Item key="6" icon={<LogoutOutlined />}>
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