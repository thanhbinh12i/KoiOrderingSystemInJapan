import { Layout, Typography, Row, Col, Card, Timeline, Statistic } from 'antd';
import {
      TeamOutlined,
      ShopOutlined,
      GlobalOutlined,
      CustomerServiceOutlined,
      SafetyCertificateOutlined, 
      EnvironmentOutlined,
      AppstoreAddOutlined
} from '@ant-design/icons';
import './AboutUs.scss';

const { Content } = Layout;
const { Title, Paragraph } = Typography;
function AboutUs() {
      return (
            <>
                  <Layout className="aboutus">
                        <Content>
                              <div className="aboutus__header">
                                    <Title>Giới Thiệu Hệ Thống Đặt Mua Cá Koi</Title>
                                    <Paragraph>
                                          Mang vẻ đẹp và sự tinh tế của cá Koi Nhật Bản đến với hồ cá của bạn
                                    </Paragraph>
                              </div>

                              <div className="aboutus__section">
                                    <Card title="Câu Chuyện Của Chúng Tôi" className="story-card">
                                          <Paragraph>
                                                Được thành lập vào tháng 10 năm 2024 tại Hà Nội, Hệ Thống Đặt Mua Cá Koi là một dự án tiên phong nhằm mang đến cho người yêu thích cá Koi ở Việt Nam cơ hội tiếp cận với những chú cá Koi chất lượng cao từ Nhật Bản. Chúng tôi bắt đầu với một ước mơ đơn giản: tạo ra một nền tảng trực tuyến dễ sử dụng, giúp người Việt Nam có thể dễ dàng sở hữu và chăm sóc những chú cá Koi tuyệt đẹp.
                                          </Paragraph>
                                          <Paragraph>
                                                Mặc dù mới ở giai đoạn khởi đầu, chúng tôi đã và đang nỗ lực xây dựng mối quan hệ với các nhà cung cấp cá Koi uy tín tại Nhật Bản, đặc biệt là từ vùng Niigata - thủ phủ cá Koi. Mục tiêu của chúng tôi là trở thành cầu nối tin cậy giữa người yêu cá Koi Việt Nam và những người nuôi cá chuyên nghiệp tại Nhật Bản.
                                          </Paragraph>
                                          <Paragraph>
                                                Hệ thống đặt mua của chúng tôi được thiết kế với giao diện thân thiện, dễ sử dụng, phù hợp với người dùng Việt Nam. Khách hàng có thể dễ dàng duyệt qua danh mục cá Koi, xem hình ảnh và video chất lượng cao của từng con cá, đồng thời thực hiện đặt mua một cách an toàn và thuận tiện. Chúng tôi đang không ngừng cải thiện và mở rộng các tính năng này để đáp ứng nhu cầu của khách hàng Việt Nam.
                                          </Paragraph>
                                          <Paragraph>
                                                Trong tương lai gần, chúng tôi dự định tích hợp công nghệ AI để cung cấp đề xuất cá Koi phù hợp với sở thích và điều kiện nuôi của từng khách hàng Việt Nam. Chúng tôi cũng lên kế hoạch phát triển một hệ thống tư vấn trực tuyến, giúp người chơi mới có thể tiếp cận với kiến thức chăm sóc cá Koi một cách dễ dàng.
                                          </Paragraph>
                                          <Paragraph>
                                                Bảo mật và quyền riêng tư của khách hàng là ưu tiên hàng đầu của chúng tôi. Chúng tôi cam kết áp dụng các biện pháp bảo mật tiên tiến để đảm bảo mọi giao dịch và thông tin cá nhân của khách hàng đều được bảo vệ an toàn.
                                          </Paragraph>
                                          <Paragraph>
                                                Với niềm đam mê về cá Koi và cam kết mang đến trải nghiệm tốt nhất cho khách hàng Việt Nam, chúng tôi hy vọng sẽ trở thành điểm đến đáng tin cậy cho tất cả những ai yêu thích loài cá tuyệt đẹp này.
                                          </Paragraph>
                                    </Card>

                                    <Card title="Sứ mệnh của chúng tôi" className="mission-card">
                                          <Paragraph>
                                                Tại Hệ Thống Đặt Mua Cá Koi, sứ mệnh của chúng tôi là:
                                          </Paragraph>
                                          <ul>
                                                <li>Mang đến những chú cá Koi chất lượng cao nhất cho khách hàng</li>
                                                <li>Hỗ trợ các trang trại cá Koi địa phương và thúc đẩy phương pháp nuôi cá bền vững</li>
                                                <li>Liên tục đổi mới và cải thiện hệ thống đặt mua của chúng tôi</li>
                                                <li>Xây dựng cộng đồng những người yêu thích cá Koi trên khắp Nhật Bản</li>
                                                <li>Đảm bảo vận chuyển an toàn và chính xác thông qua mạng lưới đối tác chuyên nghiệp</li>
                                                <li>Cung cấp dịch vụ tư vấn và hỗ trợ khách hàng 24/7</li>
                                          </ul>
                                    </Card>
                              </div>

                              <Row gutter={[32, 32]} className="aboutus__statistics">
                                    <Col xs={24} sm={12} md={6}>
                                          <Statistic title="Khách hàng hài lòng" value={10000} prefix={<CustomerServiceOutlined />} />
                                    </Col>
                                    <Col xs={24} sm={12} md={6}>
                                          <Statistic title="Trang trại đối tác" value={50} prefix={<ShopOutlined />} />
                                    </Col>
                                    <Col xs={24} sm={12} md={6}>
                                          <Statistic title="Tỉnh Thành Phục Vụ" value={100} prefix={<GlobalOutlined />} />
                                    </Col>
                                    <Col xs={24} sm={12} md={6}>
                                          <Statistic title="Chuyên gia Koi" value={20} prefix={<TeamOutlined />} />
                                    </Col>
                              </Row>

                              <div className="aboutus__history">
                                    <Title level={2}>Hành Trình và Kế Hoạch Tương Lai</Title>
                                    <Timeline mode="alternate">
                                          <Timeline.Item color="green">2024: Ra mắt Hệ Thống Đặt Mua Cá Koi</Timeline.Item>
                                          <Timeline.Item color="blue">Quý 3/2024: Mở rộng đến các thành phố lớn (Tokyo, Osaka, Kyoto)</Timeline.Item>
                                          <Timeline.Item color="orange">Quý 1/2025: Giới thiệu ứng dụng di động cho iOS và Android</Timeline.Item>
                                          <Timeline.Item color="red">Quý 3/2025: Triển khai hệ thống ghép cặp cá Koi bằng AI</Timeline.Item>
                                          <Timeline.Item color="purple">2026: Hướng tới phủ sóng toàn quốc và đạt 10,000 khách hàng hài lòng</Timeline.Item>
                                    </Timeline>
                              </div>

                              <div className="aboutus__vision">
                                    <Title level={2}>Tầm Nhìn & Cam Kết</Title>
                                    <Row gutter={[16, 16]}>
                                          <Col xs={24} sm={12} md={6}>
                                                <Card hoverable cover={<div className="icon"><AppstoreAddOutlined style={{ fontSize: '48px' }} /></div>}>
                                                      <Card.Meta title="Chất Lượng Hàng Đầu"
                                                            description="Cam kết cung cấp cá Koi chất lượng cao từ các trại cá uy tín tại Nhật Bản."
                                                      />
                                                </Card>
                                          </Col>
                                          <Col xs={24} sm={12} md={6}>
                                                <Card hoverable cover={<div className="icon"><CustomerServiceOutlined style={{ fontSize: '48px' }} /></div>}>
                                                      <Card.Meta title="Hỗ Trợ Khách Hàng"
                                                            description="Đội ngũ tư vấn nhiệt tình, sẵn sàng hỗ trợ bạn trong quá trình chọn lựa và chăm sóc cá Koi."
                                                      />
                                                </Card>
                                          </Col>
                                          <Col xs={24} sm={12} md={6}>
                                                <Card hoverable cover={<div className="icon"><SafetyCertificateOutlined style={{ fontSize: '48px' }} /></div>}>
                                                      <Card.Meta title="Bảo Đảm An Toàn"
                                                            description="Quy trình vận chuyển an toàn, đảm bảo sức khỏe tối ưu cho cá Koi đến tay khách hàng."
                                                      />
                                                </Card>
                                          </Col>
                                          <Col xs={24} sm={12} md={6}>
                                                <Card hoverable cover={<div className="icon"><EnvironmentOutlined style={{ fontSize: '48px' }} /></div>}>
                                                      <Card.Meta title="Phát Triển Bền Vững"
                                                            description="Cam kết xây dựng cộng đồng yêu cá Koi tại Việt Nam, đóng góp vào sự phát triển của ngành."
                                                      />
                                                </Card>
                                          </Col>
                                    </Row>
                              </div>
                        </Content>
                  </Layout>
            </>
      )
}
export default AboutUs;