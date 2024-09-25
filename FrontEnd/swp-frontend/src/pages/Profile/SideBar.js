import React from "react";
import { Menu, Avatar, Typography, Button } from "antd";
import {
  CreditCardOutlined,
  CalendarOutlined,
  HistoryOutlined,
  RollbackOutlined,
  BellOutlined,
  GiftOutlined,
  SettingOutlined,
  LogoutOutlined,
  GoogleOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="user-info">
        <Avatar size={40}>NV</Avatar>
        <div className="user-details">
          <Title level={5}>Nguyen Viet</Title>
          <span icon={<GoogleOutlined />}>Google</span>
        </div>
      </div>
      <Button block icon={<GoogleOutlined />}>
        Bạn là hội viên
      </Button>
      <Menu mode="vertical" defaultSelectedKeys={["account"]}>
        <Menu.Item key="password" icon={<GoogleOutlined />}>
          Mật khẩu & Bảo mật
        </Menu.Item>
        <Menu.Item key="cards" icon={<CreditCardOutlined />}>
          Thẻ của tôi
        </Menu.Item>
        <Menu.Item key="bookings" icon={<CalendarOutlined />}>
          Đặt chỗ của tôi
        </Menu.Item>
        <Menu.Item key="transactions" icon={<HistoryOutlined />}>
          Danh sách giao dịch
        </Menu.Item>
        <Menu.Item key="refunds" icon={<RollbackOutlined />}>
          Hoàn tiền
        </Menu.Item>
        <Menu.Item key="notifications" icon={<BellOutlined />}>
          Thông báo chuyến đi
        </Menu.Item>
        <Menu.Item key="promotions" icon={<GiftOutlined />}>
          Khuyến mãi
        </Menu.Item>
        <Menu.Item key="account" icon={<SettingOutlined />}>
          Tài khoản
        </Menu.Item>
        <Menu.Item key="logout" icon={<LogoutOutlined />}>
          Đăng xuất
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default Sidebar;
