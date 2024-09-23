import { Row, Col, Card, Button, Carousel, List, Avatar, Rate, Divider } from 'antd';
import { Link } from 'react-router-dom';
import './Home.scss';
import banner1 from "../../assets/home/banner1.jpg"
import banner2 from "../../assets/home/banner2.jpg"
import banner3 from "../../assets/home/banner3.jpg"

function Home() {
      const testimonials = [
            {
                  name: 'Nguyễn Phạm Thanh Bình',
                  review: 'Dịch vụ tuyệt vời! Tôi đã có một chuyến tham quan các trại Koi rất đáng nhớ và đã mua được giống Koi yêu thích.',
                  avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
                  rating: 5
            },
            {
                  name: 'Nguyễn Việt',
                  review: 'Nhân viên hỗ trợ rất tận tình, tôi hoàn toàn hài lòng với trải nghiệm của mình.',
                  avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
                  rating: 5
            },
            {
                  name: 'Hoàng Quốc An',
                  review: 'Quá trình mua Koi diễn ra suôn sẻ, từ lúc đặt tour đến khi nhận hàng.',
                  avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
                  rating: 5
            },
            {
                  name: 'Trần Đình thịnh',
                  review: 'Dịch vụ tuyệt vời!',
                  avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
                  rating: 5
            }
      ];

      const partners = [
            { name: 'Koi Farm Japan', logo: 'https://via.placeholder.com/100x50' },
            { name: 'Koi Tours Ltd', logo: 'https://via.placeholder.com/100x50' },
            { name: 'Nishikigoi Center', logo: 'https://via.placeholder.com/100x50' }
      ];
      const deliveryPartners = [
            { id: 1, name: 'DHL', imgSrc: 'https://via.placeholder.com/150', link: '#' },
            { id: 2, name: 'FedEx', imgSrc: 'https://via.placeholder.com/150', link: '#' },
            { id: 3, name: 'UPS', imgSrc: 'https://via.placeholder.com/150', link: '#' },
      ];
      return (
            <>

                  <div className="content">
                        <div className="banner">
                              <h1>Dịch vụ Đặt mua Koi từ Nhật Bản</h1>
                              <p>Khám phá các trang trại Koi nổi tiếng và dịch vụ hỗ trợ mua Koi chuyên nghiệp</p>
                              <Button type="primary" size="large">
                                    <Link to="/tours">Tìm kiếm chuyến đi</Link>
                              </Button>
                        </div>

                        <div className="featured-tours">
                              <h2>Các Tour Koi Nổi Bật</h2>
                              <Carousel autoplay>
                                    <div>
                                          <img src={banner1} alt="Tour Koi" />
                                          <h3>Tour Tham Quan Trại Koi Niigata</h3>
                                          <p>Tham quan và mua Koi tại các trại nổi tiếng ở Niigata.</p>
                                    </div>
                                    <div>
                                          <img src={banner2} alt="Tour Koi" />
                                          <h3>Tour Koi Premium Tại Hiroshima</h3>
                                          <p>Tham gia tour cao cấp với dịch vụ 5 sao tại Hiroshima.</p>
                                    </div>
                                    <div>
                                          <img src={banner3} alt="Tour Koi" />
                                          <h3>Tour Koi Premium Tại Hiroshima</h3>
                                          <p>Tham gia tour cao cấp với dịch vụ 5 sao tại Hiroshima.</p>
                                    </div>
                              </Carousel>
                        </div>
                        <div className="why-partner-section">
                              <h2>Tại Sao Bạn Nên Hợp Tác Với Chúng Tôi?</h2>
                              <Row gutter={16} justify="center">
                                    <Col span={8}>
                                          <Card hoverable>
                                                <Card.Meta
                                                      title="Kinh nghiệm lâu năm"
                                                      description="Chúng tôi có hơn 10 năm kinh nghiệm trong ngành cung cấp dịch vụ Koi tại Nhật Bản."
                                                />
                                          </Card>
                                    </Col>
                                    <Col span={8}>
                                          <Card hoverable>
                                                <Card.Meta
                                                      title="Uy tín"
                                                      description="Hợp tác với các trang trại và đối tác hàng đầu, chúng tôi đảm bảo chất lượng dịch vụ."
                                                />
                                          </Card>
                                    </Col>
                                    <Col span={8}>
                                          <Card hoverable>
                                                <Card.Meta
                                                      title="Giá cả hợp lý"
                                                      description="Chúng tôi cung cấp dịch vụ với mức giá cạnh tranh và hợp lý cho mọi đối tượng khách hàng."
                                                />
                                          </Card>
                                    </Col>
                              </Row>
                        </div>

                        <div className="services-section">
                              <h2>Các Dịch Vụ Của Chúng Tôi</h2>
                              <Row gutter={16}>
                                    <Col span={8}>
                                          <Card title="Dịch Vụ Tham Quan Trang Trại Koi" bordered={false}>
                                                <p>
                                                      Chúng tôi cung cấp dịch vụ tham quan các trang trại Koi nổi tiếng tại Nhật Bản, đặc biệt là tại Niigata – nơi có các trang trại Koi hàng đầu thế giới.
                                                      Du khách có thể tận mắt chiêm ngưỡng và lựa chọn những giống Koi quý hiếm, chất lượng cao.
                                                </p>
                                          </Card>
                                    </Col>
                                    <Col span={8}>
                                          <Card title="Dịch Vụ Mua Koi Tận Nơi" bordered={false}>
                                                <p>
                                                      Với dịch vụ này, chúng tôi sẽ giúp bạn mua Koi trực tiếp từ các trang trại uy tín tại Nhật Bản. Bạn sẽ được hỗ trợ toàn bộ quá trình, từ chọn giống Koi đến các thủ tục xuất nhập khẩu.
                                                </p>
                                          </Card>
                                    </Col>
                                    <Col span={8}>
                                          <Card title="Dịch Vụ Vận Chuyển Quốc Tế" bordered={false}>
                                                <p>
                                                      Chúng tôi cung cấp dịch vụ vận chuyển Koi quốc tế an toàn và nhanh chóng, đảm bảo Koi của bạn được giao đến tận tay với điều kiện sức khỏe tốt nhất.
                                                </p>
                                          </Card>
                                    </Col>
                              </Row>
                        </div>
                        <section className="delivery-partners-section">
                              <h2>Đối Tác Vận Chuyển</h2>
                              <Row justify="center" gutter={16}>
                                    {deliveryPartners.map(partner => (
                                          <Col span={4} key={partner.id}>
                                                <a href={partner.link} target="_blank" rel="noopener noreferrer">
                                                      <img src={partner.imgSrc} alt={partner.name} style={{ width: '100%', borderRadius: '8px' }} />
                                                </a>
                                          </Col>
                                    ))}
                              </Row>
                        </section>
                        <div className="certifications">
                              <h2>Chứng nhận và Đối tác</h2>
                              <Row gutter={16}>
                                    {partners.map(partner => (
                                          <Col span={8} key={partner.name}>
                                                <Card bordered={false} cover={<img src={partner.logo} alt={partner.name} />}>
                                                      <h3>{partner.name}</h3>
                                                </Card>
                                          </Col>
                                    ))}
                              </Row>
                        </div>

                        <Divider />
                        <div className="testimonials">
                              <h2>Đánh giá từ Khách hàng</h2>
                              <List
                                    itemLayout="horizontal"
                                    dataSource={testimonials}
                                    renderItem={item => (
                                          <List.Item>
                                                <List.Item.Meta
                                                      avatar={<Avatar src={item.avatar} />}
                                                      title={item.name}
                                                      description={item.review}
                                                />
                                                <Rate disabled defaultValue={item.rating} />
                                          </List.Item>
                                    )}
                              />
                        </div>

                  </div>
            </>
      )
}
export default Home;