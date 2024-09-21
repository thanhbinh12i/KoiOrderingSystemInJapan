import { UserOutlined, SettingOutlined, HistoryOutlined, LogoutOutlined, DownOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Avatar } from 'antd';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { checkLogin } from '../../actions/login';
import "./MenuUser.scss"
function MenuUser() {
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const handleLogout = () => {
            localStorage.removeItem("token");
            dispatch(checkLogin(false));
            navigate("/");
      };
      const userMenu = (
            <Menu>
                  <Menu.Item key="profile" icon={<UserOutlined />} className="profile-item">
                        <Link to="/profile">Tài khoản của tôi</Link>
                  </Menu.Item>
                  <Menu.Item key="bookings" icon={<HistoryOutlined />} className="bookings-item">
                        <Link to="/bookings">Đặt chỗ của tôi</Link>
                  </Menu.Item>
                  <Menu.Item key="settings" icon={<SettingOutlined />} className="settings-item">
                        <Link to="/settings">Cài đặt</Link>
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout} className="logout-item">
                        Đăng xuất
                  </Menu.Item>
            </Menu>
      );
      return (
            <>
                  <Dropdown overlay={userMenu} trigger={['click']} overlayClassName="user-menu" placement="bottomRight"  align={{ offset: [0, 4] }} >
                        <a className="user-menu-trigger">
                              <Avatar icon={<UserOutlined />} />
                              <span className="user-name">Thanh Bình</span>
                              <DownOutlined />
                        </a>
                  </Dropdown>
            </>
      )
}
export default MenuUser;