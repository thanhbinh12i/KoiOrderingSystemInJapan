import { Link, NavLink } from "react-router-dom";
import { Button, Layout, Menu, Row, Col } from 'antd';
import { HomeOutlined, SolutionOutlined, InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import logo from "../../assets/logo.jpg";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/login";
import MenuUser from "../../components/MenuUser";

function Header() {
      const dispatch = useDispatch();
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
                                                <img width={100} height={80} src={logo} alt="" className="my-website__logo-image" />
                                          </Link>
                                    </Col>

                                    <Col xs={24} sm={12} className="layout-default__header-center">
                                          <Menu mode="horizontal" defaultSelectedKeys={['1']}>
                                                <Menu.Item key="1" icon={<HomeOutlined />}>
                                                      <Link to="/">Trang chủ</Link>
                                                </Menu.Item>
                                                <Menu.Item key="2" icon={<SolutionOutlined />}>
                                                      <Link to="/tours">Chuyến đi</Link>
                                                </Menu.Item>
                                                <Menu.Item key="3" icon={<SolutionOutlined />}>
                                                      <Link to="/kois">Cá koi</Link>
                                                </Menu.Item>
                                                <Menu.Item key="4" icon={<SolutionOutlined />}>
                                                      <Link to="/farms">Trang trại</Link>
                                                </Menu.Item>
                                                <Menu.Item key="5" icon={<SolutionOutlined />}>
                                                      <Link to="/services">Dịch vụ</Link>
                                                </Menu.Item>
                                                <Menu.Item key="6" icon={<InfoCircleOutlined />}>
                                                      <Link to="/aboutus">Về chúng tôi</Link>
                                                </Menu.Item>
                                          </Menu>
                                    </Col>

                                    <Col xs={24} sm={6} className="layout-default__header-right" >
                                          {!token ? (
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
      )
}
export default Header;