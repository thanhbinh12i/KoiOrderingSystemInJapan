import { Link, NavLink } from "react-router-dom";
import { Button, Layout, Menu, Row, Col } from "antd";
import {
  HomeOutlined,
  CompassOutlined,
  AppstoreOutlined,
  GoldOutlined,
  BankOutlined,
  InfoCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import logo from "../../assets/logo.jpg";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "../../actions/login";
import MenuUser from "../../components/MenuUser";

function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.loginReducer);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      dispatch(checkLogin(true));
    }
  }, [dispatch, token]);

  return (
    <>
      <Layout>
        <div className="layout-default__header">
          <Row align="middle">
            <Col xs={24} sm={6} className="layout-default__header-left">
              <Link to="/">
                <img
                  width={100}
                  height={80}
                  src={logo}
                  alt=""
                  className="my-website__logo-image"
                />
              </Link>
            </Col>

            <Col xs={24} sm={12} className="layout-default__header-center">
              <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
                <Menu.Item key="1" icon={<HomeOutlined />}>
                  <Link to="/">Trang chủ</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<CompassOutlined />}>
                  <Link to="/tours">Chuyến đi</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<AppstoreOutlined />}>
                  <Link to="/varieties">Giống cá</Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<GoldOutlined />}>
                  <Link to="/kois">Cá koi</Link>
                </Menu.Item>
                <Menu.Item key="5" icon={<BankOutlined />}>
                  <Link to="/farms">Trang trại</Link>
                </Menu.Item>
                <Menu.Item key="6" icon={<InfoCircleOutlined />}>
                  <Link to="/aboutus">Về chúng tôi</Link>
                </Menu.Item>
              </Menu>
            </Col>

            <Col xs={24} sm={6} className="layout-default__header-right">
              {!isLoggedIn ? (
                <>
                  <Button size="large">
                    <NavLink to="/login">
                      <UserOutlined /> Đăng nhập
                    </NavLink>
                  </Button>
                  <Button type="primary" size="large">
                    <NavLink to="/register">Đăng ký</NavLink>
                  </Button>
                </>
              ) : (
                <MenuUser />
              )}
            </Col>
          </Row>
        </div>
      </Layout>
    </>
  );
}
export default Header;
