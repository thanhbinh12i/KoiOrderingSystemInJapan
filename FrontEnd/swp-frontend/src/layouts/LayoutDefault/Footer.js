import { Row, Col } from 'antd';
import { PhoneOutlined, MailOutlined, EnvironmentOutlined } from '@ant-design/icons';
function Footer() {
      return (
            <>
            
                  <div className="layout-default__footer">
                        <div className="container">
                              <Row gutter={[16, 16]}>
                                    <Col xs={24} sm={8}>
                                          <h2>Liên hệ với chung tôi</h2>
                                          <p><PhoneOutlined /> Phone: 0948182978</p>
                                          <p><MailOutlined /> Email: koiordering</p>
                                          <p><EnvironmentOutlined /> Address: ĐẠI HỌC FPT</p>
                                    </Col>

                                    <Col xs={24} sm={8}>
                                          <h2>Liên kết</h2>
                                          <ul className="layout-default__footer-links">
                                                <li><a href="/">Trang chủ</a></li>
                                                <li><a href="/tours">Chuyến đi</a></li>
                                                <li><a href="/tours">Trang trại</a></li>
                                                <li><a href="/tours">Giống cá</a></li>
                                                <li><a href="/services">Dịch vụ</a></li>
                                                <li><a href="/about">Về chúng tôi</a></li>
                                                <li><a href="/contact">Liên hệ</a></li>
                                          </ul>
                                    </Col>

                                    <Col xs={24} sm={8}>
                                          <h2>Theo dõi chúng tôi trên</h2>
                                          <div className="layout-default__footer-social-links">
                                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                                          </div>
                                    </Col>
                              </Row>

                              <Row justify="center" className="layout-default__footer-copyright">
                                    <Col xs={24}>
                                          <p>© 2024 Koi Ordering System. All rights reserved.</p>
                                    </Col>
                              </Row>
                        </div>
                  </div>
            </>
      )
}
export default Footer;