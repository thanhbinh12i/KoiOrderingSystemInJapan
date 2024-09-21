import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button, Layout, Menu, Row, Col} from 'antd';
import { HomeOutlined, SolutionOutlined, InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import logo from "./logo.jpg";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "../../actions/login";
import MenuUser from "../../components/MenuUser";

function Header() {
      const dispatch = useDispatch();
      const isLoggedIn = useSelector((state) => state.loginReducer);

      useEffect(() => {
            const token = localStorage.getItem("token");
            if (token) {
                  dispatch(checkLogin(true));
            }
      }, []);

     


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
                                                      Chuyến đi
                                                </Menu.Item>
                                                <Menu.Item key="3" icon={<SolutionOutlined />}>
                                                      Giống cá
                                                </Menu.Item>
                                                <Menu.Item key="4" icon={<SolutionOutlined />}>
                                                      Trang trại
                                                </Menu.Item>
                                                <Menu.Item key="5" icon={<SolutionOutlined />}>
                                                      Dịch vụ
                                                </Menu.Item>
                                                <Menu.Item key="6" icon={<InfoCircleOutlined />}>
                                                      Về chúng tôi
                                                </Menu.Item>
                                          </Menu>
                                    </Col>

                                    <Col xs={24} sm={6} className="layout-default__header-right" >
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
      )
}
export default Header;