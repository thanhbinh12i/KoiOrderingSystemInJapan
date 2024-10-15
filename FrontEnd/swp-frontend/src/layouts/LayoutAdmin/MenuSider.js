import { Menu } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  BankOutlined,
  ExperimentOutlined,
  GoldOutlined,
  CompassOutlined,
  OrderedListOutlined,
  PlusOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
function MenuSider() {
  const items = [
    {
      label: <Link to="/admin">Tổng quan</Link>,
      icon: <DashboardOutlined />,
      key: "/admin",
    },
    {
      label: <Link to="/quotation-manager">Quản lí báo giá</Link>,
      icon: <BankOutlined />,
      key: "/quotation-manager",
    },
    {
      label: <Link to="/user-manager">Quản lí người dùng</Link>,
      icon: <UserOutlined />,
      key: "/user-manager",
    },
    {
      label: "Quản lý nhân sự",
      icon: <UserOutlined />,
      key: "/staff-manager",
      children: [
        {
          label: <Link to="/staff-manager">Danh sách nhân viên</Link>,
          icon: <OrderedListOutlined />,
          key: "/staff-list",
        },
        {
          label: <Link to="/create-staff">Tạo tài khoản nhân viên</Link>,
          icon: <PlusOutlined />,
          key: "/create-staff",
        },
      ],
    },
    {
      label: "Quản lí trang trại",
      icon: <BankOutlined />,
      key: "/farm-manager",
      children: [
        {
          label: <Link to="/farm-manager">Danh sách trang trại</Link>,
          icon: <OrderedListOutlined />,
          key: "/farm-list",
        },
        {
          label: <Link to="/create-farm">Thêm trang trại</Link>,
          icon: <PlusOutlined />,
          key: "/create-farm",
        },
      ],
    },
    {
      label: <Link to="/koivariety-manager">Quản lí giống cá</Link>,
      icon: <ExperimentOutlined />,
      key: "/koivariety-manager",
    },
    {
      label: "Quản lí cá koi",
      icon: <GoldOutlined />,
      key: "/koi-manager",
      children: [
        {
          label: <Link to="/koi-manager">Danh sách cá koi</Link>,
          icon: <OrderedListOutlined />,
          key: "/koi-list",
        },
        {
          label: <Link to="/create-koi">Thêm cá koi</Link>,
          icon: <PlusOutlined />,
          key: "/create-koi",
        },
      ],
    },
    {
      label: <Link to="/service-manager">Quản lí vận chuyển</Link>,
      icon: <ToolOutlined />,
      key: "/service-manager",
    },
    {
      label: "Quản lí tour",
      icon: <CompassOutlined />,
      key: "/tour-manager",
      children: [
        {
          label: <Link to="/tour-manager">Danh sách tour</Link>,
          icon: <OrderedListOutlined />,
          key: "/tour-list",
        },
        {
          label: <Link to="/create-tour">Thêm tour mới</Link>,
          icon: <PlusOutlined />,
          key: "/create-tour",
        },
      ],
    },
  ];
  return (
    <>
      <Menu
        mode="inline"
        items={items}
        defaultSelectedKeys={["/"]}
        defaultOpenKeys={["admin"]}
      />
    </>
  );
}
export default MenuSider;
