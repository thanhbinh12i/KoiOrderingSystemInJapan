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
  List,
} from "antd";
import {
  ClockCircleOutlined,
  UserOutlined,
  DollarOutlined,
  StarOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import GoBack from "../../components/GoBack";

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
                  {tour.startTime} đến {tour.finishTime}
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
                <Descriptions.Item
                  label={
                    <Space>
                      <DollarOutlined /> Giá
                    </Space>
                  }
                >
                  {tour.price}
                </Descriptions.Item>
              </Descriptions>

              <div className="farm-section">
                <h4>
                  <GlobalOutlined /> Các trang trại tham quan trong chuyến đi:
                </h4>
                <List
                  dataSource={farm}
                  itemLayout="vertical"
                  renderItem={(item) => (
                    <List.Item key={item.farmName} className="farm-list-item">
                      <div className="farm-container">
                        <img
                          src={`https://koidayne.azurewebsites.net/uploads/koiFarm/${item.farmImages[0].urlImage}`}
                          alt={item.farmName}
                          className="farm-image"
                        />
                        <div className="farm-info">
                          <Title level={4} className="farm-name">
                            {item.farmName}
                          </Title>
                          <Text className="farm-location">
                            <EnvironmentOutlined className="location-icon" />{" "}
                            {item.location}
                          </Text>
                        </div>
                      </div>
                    </List.Item>
                  )}
                />
              </div>

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
