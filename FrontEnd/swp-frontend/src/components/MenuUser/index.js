// eslint-disable-next-line
import { UserOutlined, SettingOutlined, HistoryOutlined, LogoutOutlined, DownOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Avatar } from 'antd';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { checkLogin } from '../../actions/login';
import { useEffect, useState } from 'react';
import { get } from '../../utils/request';
import "./MenuUser.scss"
function MenuUser() {
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const userId = localStorage.getItem("id");
      const role = localStorage.getItem('role');
      const [userName, setUserName] = useState('');
      const handleLogout = () => {
            localStorage.removeItem("token");
            localStorage.removeItem("id");
            localStorage.removeItem("role");
            dispatch(checkLogin(false));
            navigate("/");
      };
      useEffect(() => {
            const fetchUserProfile = async () => {
                  if (userId) {
                        const response = await get(`account/${userId}`);
                        if (response) {
                              setUserName(response.fullName);
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

                  <Menu.Item key="my-bookings" icon={<HistoryOutlined />} className="bookings-item">
                        <Link to="/my-bookings">Đặt chỗ của tôi</Link>
                  </Menu.Item>
                  <Menu.Item key="settings" icon={<SettingOutlined />} className="settings-item">
                        <Link to="/settings">Thay đổi mật khẩu</Link>
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout} className="logout-item">
                        Đăng xuất
                  </Menu.Item>
            </Menu>
      );
      return (
            <>
                  <Dropdown overlay={userMenu} trigger={['click']} overlayClassName="user-menu" placement="bottomRight" align={{ offset: [0, 4] }} >
                        <div className="user-menu-trigger">
                              <Avatar icon={<UserOutlined />} />
                              <span className="user-name">{userName}</span>
                              <DownOutlined />
                        </div>
                  </Dropdown>
            </>
      )
}
export default MenuUser;