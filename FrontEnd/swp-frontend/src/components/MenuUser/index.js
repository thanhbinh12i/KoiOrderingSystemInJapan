// eslint-disable-next-line
import { UserOutlined, SettingOutlined, HistoryOutlined, LogoutOutlined, DownOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Avatar, Space, Typography } from 'antd';
import { Link, NavLink} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { get } from '../../utils/request';
import "./MenuUser.scss"
function MenuUser() {
      const userId = localStorage.getItem("id");
      const role = localStorage.getItem('role');
      const [user, setUser] = useState({});
      useEffect(() => {
            const fetchUserProfile = async () => {
                  if (userId) {
                        const response = await get(`account/${userId}`);
                        if (response) {
                              setUser(response);
                        }
                  }

            }
            fetchUserProfile();
      }, [userId])
      const userMenu = (
            <Menu>
                  <Menu.Item key="profile" icon={<UserOutlined />} className="profile-item">
                        <Link to="/profile">Tài khoản của tôi</Link>
                  </Menu.Item>
                  {
                        role === "Customer" && (
                              <>
                                    <Menu.Item key="my-bookings" icon={<HistoryOutlined />} className="bookings-item">
                                          <Link to="/my-bookings">Đặt chỗ của tôi</Link>
                                    </Menu.Item>
                              </>
                        )
                  }
                  {
                        role === "Manager" && (
                              <Menu.Item key="admin" icon={<UserOutlined />} className="admin-item">
                                    <Link to="/admin">Trang quản lý</Link>
                              </Menu.Item>
                        )
                  }
                  {
                        role.includes("Staff") && (
                              <Menu.Item key="staff" icon={<UserOutlined />} className="admin-item">
                                    <Link to="/staff">Trang nhân viên</Link>
                              </Menu.Item>
                        )
                  }
                  <Menu.Item key="settings" icon={<SettingOutlined />} className="settings-item">
                        <Link to="/settings">Thay đổi mật khẩu</Link>
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item key="logout" icon={<LogoutOutlined />} className="logout-item">
                        <NavLink to="/logout">Đăng xuất</NavLink>
                  </Menu.Item>
            </Menu>
      );
      return (
            <>
                  <Dropdown
                        overlay={userMenu}
                        trigger={['click']}
                        overlayClassName="user-profile"
                        placement="bottomRight"
                        align={{ offset: [0, 4] }}
                  >
                        <Space className="user-profile__button">
                              <Avatar icon={<UserOutlined />} />
                              <div>
                                    <Typography.Text className="username">
                                          {user.fullName}
                                    </Typography.Text>
                                    <Typography.Text className="email">
                                          {user.email}
                                    </Typography.Text>
                              </div>
                        </Space>
                  </Dropdown>

            </>
      )
}
export default MenuUser;