import { Row, Col, Card, Button, Carousel, Typography } from "antd";
import {
  DollarCircleOutlined,
  TeamOutlined,
  CarOutlined,
  GlobalOutlined,
  CreditCardOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./Home.scss";
import banner1 from "../../assets/home/banner-1.jpg";
import banner2 from "../../assets/home/banner-2.jpg";
import banner3 from "../../assets/home/banner-3.jpg";
import banner4 from "../../assets/home/banner-4.jpg";
import deliver from "../../assets/home/deliver-home.jpg";
import koiorder from "../../assets/home/koi-order.jpg";
import koifarmtour from "../../assets/home/koi-farm-tour.jpg";

const { Title, Paragraph } = Typography;
function Home() {
  return (
    <div className="home">
      <div className="home-container">
        <div className="home__search">
          <h1>Dịch vụ Đặt mua Koi từ Nhật Bản</h1>
          <p>
            Khám phá các trang trại Koi nổi tiếng và dịch vụ hỗ trợ mua Koi
            chuyên nghiệp tại đây
          </p>
          <Button type="primary" size="large">
            <Link to="/tours">Tìm kiếm chuyến đi</Link>
          </Button>
        </div>

        <div className="home__banner">
          <Title level={2} className="section-title">
            Các Tour Koi Nổi Bật
          </Title>
          <Carousel autoplay arrows infinite={false}>
            <div>
              <img src={banner4} alt="Tour Koi Niigata" />
              <h3>Khám Phá Trại Koi Tại Niigata</h3>
              <p>
                Trải nghiệm chuyến tham quan và mua Koi tại các trại Koi danh
                tiếng ở Niigata, nơi có nhiều giống Koi quý hiếm.
              </p>
            </div>
            <div>
              <img src={banner1} alt="Tour Koi Niigata" />
              <h3>Tour Tham Quan Trại Koi Hosokai</h3>
              <p>
                Tham quan và mua Koi tại các trại nổi tiếng ở Hosokai, quê hương
                của nhiều giống Koi đặc sắc.
              </p>
            </div>
            <div>
              <img src={banner2} alt="Tour Koi Hiroshima" />
              <h3>Tour Koi Premium Tại Hiroshima</h3>
              <p>
                Trải nghiệm tour cao cấp với dịch vụ 5 sao tại Hiroshima, bao
                gồm thăm quan và mua sắm tại các trại Koi hàng đầu.
              </p>
            </div>
            <div>
              <img src={banner3} alt="Tokyo Koi Show" />
              <h3>Tham Dự Tokyo Koi Show</h3>
              <p>
                Cơ hội độc đáo để chiêm ngưỡng những chú Koi đẹp nhất và gặp gỡ
                các chuyên gia hàng đầu trong ngành.
              </p>
            </div>
          </Carousel>
        </div>
        <div className="home__choose">
          <div className="home__choose-container">
            <Title level={2} className="section-title">
              Vì sao bạn nên chọn Koi Đây Nè?
            </Title>

            <Row gutter={[16, 16]} className="features">
              <Col xs={24} sm={8}>
                <Card>
                  <DollarCircleOutlined className="feature-icon" />
                  <Title level={4}>Giá tốt nhất cho bạn</Title>
                  <Paragraph>
                    Có nhiều mức giá đa dạng phù hợp với ngân sách và nhu cầu
                    của bạn
                  </Paragraph>
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card>
                  <TeamOutlined className="feature-icon" />
                  <Title level={4}>Booking dễ dàng</Title>
                  <Paragraph>
                    Các bước booking và chăm sóc khách hàng nhanh chóng và thuận
                    tiện
                  </Paragraph>
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card>
                  <CarOutlined className="feature-icon" />
                  <Title level={4}>Tour du lịch tối ưu</Title>
                  <Paragraph>
                    Đa dạng các loại hình tour tham quan đa dạng trang trại với
                    nhiều mức giá khác nhau
                  </Paragraph>
                </Card>
              </Col>
            </Row>

            <Title level={2} className="section-title">
              Booking cùng Koi Đây Nè
            </Title>
            <Paragraph className="section-description">
              Chỉ với 3 bước đơn giản và dễ dàng có ngay trải nghiệm tuyệt vời!
            </Paragraph>

            <div className="home__booking-steps">
              <div className="curved-line"></div>
              <Row gutter={[16, 16]} className="booking-steps">
                <Col xs={24} sm={8}>
                  <div className="step-item">
                    <div className="step-number">1</div>
                    <GlobalOutlined className="step-icon" />
                    <Title level={4}>Tìm trang trại muốn đến</Title>
                    <Paragraph>
                      Bất cứ nơi đâu bạn muốn đến, chúng tôi có tất cả những
                      trang trại bạn cần
                    </Paragraph>
                  </div>
                </Col>
                <Col xs={24} sm={8}>
                  <div className="step-item">
                    <div className="step-number">2</div>
                    <CreditCardOutlined className="step-icon" />
                    <Title level={4}>Đặt dịch vụ</Title>
                    <Paragraph>
                      Koi Đây Nè sẽ hỗ trợ bạn đặt dịch vụ nhanh chóng và thuận
                      tiện
                    </Paragraph>
                  </div>
                </Col>
                <Col xs={24} sm={8}>
                  <div className="step-item">
                    <div className="step-number">3</div>
                    <BankOutlined className="step-icon" />
                    <Title level={4}>Thanh toán</Title>
                    <Paragraph>
                      Hoàn thành bước thanh toán và sẵn sàng cho chuyến đi ngay
                      thôi
                    </Paragraph>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>

        <div className="home__services">
          <Title level={2} className="section-title">
            Các Dịch Vụ Của Chúng Tôi
          </Title>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <Card
                cover={<img alt="Koi Farm Tour" src={koifarmtour} />}
                className="service-card"
              >
                <Title level={4}>Dịch Vụ Tham Quan Trang Trại Koi</Title>
                <Paragraph>
                  Chúng tôi cung cấp dịch vụ tham quan các trang trại Koi nổi
                  tiếng tại Nhật Bản, đặc biệt là tại Niigata – nơi có các trang
                  trại Koi hàng đầu thế giới. Du khách có thể tận mắt chiêm
                  ngưỡng và lựa chọn những giống Koi quý hiếm, chất lượng cao.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card
                cover={<img alt="Koi Purchase Service" src={koiorder} />}
                className="service-card"
              >
                <Title level={4}>Dịch Vụ Mua Koi Tận Nơi</Title>
                <Paragraph>
                  Với dịch vụ này, chúng tôi sẽ giúp bạn mua Koi trực tiếp từ
                  các trang trại uy tín tại Nhật Bản. Bạn sẽ được hỗ trợ toàn bộ
                  quá trình, từ chọn giống Koi đến các thủ tục xuất nhập khẩu.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card
                cover={<img alt="International Shipping" src={deliver} />}
                className="service-card"
              >
                <Title level={4}>Dịch Vụ Vận Chuyển Quốc Tế</Title>
                <Paragraph>
                  Chúng tôi cung cấp dịch vụ vận chuyển Koi quốc tế an toàn và
                  nhanh chóng, đảm bảo Koi của bạn được giao đến tận tay với
                  điều kiện sức khỏe tốt nhất.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Home;
