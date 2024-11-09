import React from "react";
import { Menu, Typography, Avatar, Button } from "antd";
import {
  DropboxOutlined,
  HistoryOutlined,
  SettingOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import { get } from "../../utils/request";
import { useState, useEffect } from "react";
import avatarMale from "../../assets/home/avatar-Male.jpg";
import avatarFemale from "../../assets/home/avatar-Female.jpg";
import avatarDefault from "../../assets/home/avatar-default.jpg";
import { Link } from "react-router-dom";

const { Title } = Typography;

function Sidebar() {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    gender: "",
  });
  const userId = localStorage.getItem("id");

  const fetchPersonalInfo = async () => {
    try {
      const response = await get(`account/${userId}`);
      setPersonalInfo(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchPersonalInfo();
    // eslint-disable-next-line
  }, []);
  const getAvatarImage = () => {
    if (personalInfo.gender === "male") {
      return avatarMale;
    } else if (personalInfo.gender === "female") {
      return avatarFemale;
    } else {
      return avatarDefault;
    }
  };
  return (
    <div className="sidebar">
      <div className="user-info">
        <Avatar size={40}>
          <img
            src={getAvatarImage()}
            alt="Avatar"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        </Avatar>

        <div className="user-details">
          <Title level={5}>{personalInfo.fullName}</Title>
          <span icon={<GoogleOutlined />}>Google</span>
        </div>
      </div>
      <Button block icon={<GoogleOutlined />}>
        Bạn là hội viên
      </Button>
      <Menu mode="vertical">
        <Menu.Item key="account" icon={<SettingOutlined />}>
          <Link to="/profile">Tài khoản</Link>
        </Menu.Item>
        <Menu.Item key="password" icon={<SettingOutlined />}>
          <Link to="/settings"> Mật khẩu & Bảo mật</Link>
        </Menu.Item>
        <Menu.Item key="my-bookings" icon={<HistoryOutlined />}>
          <Link to="/my-bookings">Đặt chỗ của tôi</Link>
        </Menu.Item>
        <Menu.Item key="my-bills" icon={<DropboxOutlined  />}>
          <Link to="/my-orders">Đơn hàng của tôi </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default Sidebar;
