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
                                          <p><PhoneOutlined /> Phone: 094 818 2978</p>
                                          <p><MailOutlined /> Email: koidayne@gmail.com</p>
                                          <p><EnvironmentOutlined /> Address: ĐẠI HỌC FPT</p>
                                    </Col>

                                    <Col xs={24} sm={8}>
                                          <h2>Liên kết</h2>
                                          <ul className="layout-default__footer-links">
                                                <li><a href="/">Trang chủ</a></li>
                                                <li><a href="/tours">Chuyến đi</a></li>
                                                <li><a href="/farms">Trang trại</a></li>
                                                <li><a href="/varieties">Giống cá</a></li>
                                                <li><a href="/kois">Cá koi</a></li>
                                                <li><a href="/about">Về chúng tôi</a></li>
                                                <li><a href="/contact">Liên hệ</a></li>
                                          </ul>
                                    </Col>

                                    <Col xs={24} sm={8}>
                                          <h2>Theo dõi chúng tôi trên</h2>
                                          <div className="layout-default__footer-social-links">
                                                <a href="https://www.facebook.com/FPTU.HCM" target="_blank" rel="noreferrer">
                                                      <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" />
                                                </a>
                                                <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                                                      <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" />
                                                </a>
                                                <a href="https://github.com/thanhbinh12i/swp391_G1_SE1857_koiOrderingSystem" target="_blank" rel="noreferrer">
                                                      <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="GitHub" />
                                                </a>
                                                <a href="https://www.tiktok.com" target="_blank" rel="noreferrer">
                                                      <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg" alt="TikTok" />
                                                </a>
                                          </div>
                                    </Col>
                              </Row>

                              <Row justify="center" className="layout-default__footer-copyright">
                                    <Col xs={24}>
                                          <p>© 2024 Koi Day Ne. All rights reserved.</p>
                                    </Col>
                              </Row>
                        </div>
                  </div>
            </>
      )
}
export default Footer;