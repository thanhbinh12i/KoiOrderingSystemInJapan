import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../../utils/request";
import {
  Card,
  Descriptions,
  Rate,
  Typography,
  Space,
  Divider,
  Row,
  Col,
} from "antd";
import {
  ClockCircleOutlined,
  UserOutlined,
  StarOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import GoBack from "../../components/GoBack";
import TourSchedule from "./TourSchedule.";
const { Title, Text } = Typography;

function TourDetail() {
  const params = useParams();
  const [tour, setTour] = useState(null);
  const [farm, setFarm] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await get(`tour/view-tourId/${params.id}`);
      if (response) {
        setTour(response);
      }
    };
    fetchApi();
  }, [params.id]);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await get(`tourDestination/view-tourId/${params.id}`);
      if (response) {
        const responseFarms = await Promise.all(
          response.map((item) => get(`koiFarm/view/${item.farmId}`))
        );

        if (responseFarms) {
          setFarm(responseFarms);
        }
      }
    };
    fetchApi();
  }, [params.id]);
  return (
    <>
      <GoBack />
      {tour && (
        <>
          <Card className="tour-info-card">
            <Title level={2}>{tour.tourName}</Title>
            <Divider />
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Descriptions column={1} labelStyle={{ fontWeight: "bold" }}>
                <Descriptions.Item
                  label={
                    <Space>
                      <ClockCircleOutlined /> Thời gian
                    </Space>
                  }
                >
                  {tour.startTime} đến{" "}
                  {tour.finishTime}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <Space>
                      <UserOutlined /> Số lượng người tham gia
                    </Space>
                  }
                >
                  {tour.numberOfParticipate}
                </Descriptions.Item>
              </Descriptions>

              <div className="expense-section">
                <Title level={4}>
                  <DollarCircleOutlined /> Chi phí chuyến đi: {tour.price.toLocaleString()} đ
                </Title>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Card title="Chi phí đã bao gồm" className="expense-card included">
                      <ul>
                        <li>Xe đưa đón theo chương trình</li>
                        <li>Hướng dẫn viên suốt tuyến</li>
                        <li>Vé tham quan các điểm trong chương trình</li>
                        <li>Khách sạn tiêu chuẩn (2 người/phòng)</li>
                        <li>Bảo hiểm du lịch</li>
                        <li>Nước uống trên xe</li>
                      </ul>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card title="Chi phí tự túc" className="expense-card excluded">
                      <ul>
                        <li>Ăn uống: khoảng 300,000đ/người/ngày</li>
                        <li>Đồ uống trong các bữa ăn</li>
                        <li>Chi phí cá nhân</li>
                        <li>Chi phí phát sinh ngoài chương trình</li>
                        <li>Tiền tip cho hướng dẫn viên và tài xế</li>
                      </ul>
                    </Card>
                  </Col>
                </Row>
              </div>
              <TourSchedule tour={tour} farm={farm} />

              <Divider />
              <div className="tour-rating">
                <StarOutlined />
                <Text strong>Đánh giá:</Text>
                <Rate disabled value={5} />
                <Text type="secondary">(5)</Text>
              </div>
            </Space>
          </Card>
        </>
      )}
    </>
  );
}
export default TourDetail;
