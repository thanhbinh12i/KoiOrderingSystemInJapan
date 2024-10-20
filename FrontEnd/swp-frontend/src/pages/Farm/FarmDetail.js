import { useParams } from "react-router-dom";
import {
  Card,
  Descriptions,
  Rate,
  Typography,
  Space,
  Divider,
  Carousel,
  Spin,
} from "antd";
import {
  EnvironmentOutlined,
  ClockCircleOutlined,
  MailOutlined,
  PhoneOutlined,
  StarOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { get } from "../../utils/request";
import GoBack from "../../components/GoBack";
import RatingFarm from "../../components/RatingFarm";
const { Title, Text } = Typography;

function FarmDetail() {
  const [farm, setFarm] = useState({});
  const params = useParams();
  const [koiData, setKoiData] = useState([]);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchApi = async () => {
      const response = await get(`koiFarm/view/${params.id}`);
      if (response) {
        setFarm(response);
        const fetchKoiByFarm = async () => {
          const res = await get(`koi/view-by-farm/${response.farmName})`);
          if (res) {
            setKoiData(res);
          }
        };
        fetchKoiByFarm();
      }
    };
    fetchApi();
  }, [params.id]);

  if (!farm.farmName || koiData.length === 0) {
    return <Spin>Loading...</Spin>;
  }

  return (
    <>
      <GoBack />
      <div className="farm-detail">
        <Carousel autoplay>
          {farm.farmImages &&
            farm.farmImages.map((img, index) => (
              <div key={index}>
                <img
                  src={`https://koidayne.azurewebsites.net/uploads/koiFarm/${img.urlImage}`}
                  alt={`${farm.farmName} - Ảnh ${index + 1}`}
                  style={{ width: "100%", height: "400px", objectFit: "cover" }}
                />
              </div>
            ))}
        </Carousel>

        <Card className="farm-info-card">
          <Title level={2}>{farm.farmName}</Title>
          <Divider />
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Descriptions column={1} labelStyle={{ fontWeight: "bold" }}>
              <Descriptions.Item
                label={
                  <Space>
                    <EnvironmentOutlined /> Địa điểm
                  </Space>
                }
              >
                <strong>{farm.location}</strong>
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <Space>
                    <ClockCircleOutlined /> Giờ mở cửa
                  </Space>
                }
              >
                <strong>
                  {farm.openHour} - {farm.closeHour}
                </strong>
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <Space>
                    <MailOutlined /> Email
                  </Space>
                }
              >
                <strong>{farm.email}</strong>
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <Space>
                    <PhoneOutlined /> Hotline
                  </Space>
                }
              >
                <strong>{farm.hotline}</strong>
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <Space>
                    <GlobalOutlined /> Mô tả
                  </Space>
                }
              >
                <strong>{farm.introduction}</strong>
              </Descriptions.Item>
            </Descriptions>
            <Divider />
            <Space align="center">
              <StarOutlined />
              <Text strong>Đánh giá:</Text>
              <Rate disabled value={5} />
              <Text type="secondary">({5})</Text>
            </Space>
          </Space>
        </Card>

        <h2>Danh sách cá Koi trong trang trại</h2>
      </div>

      <div className="koi-by-farm-container">
        {koiData.map((koi) => (
          <Card key={koi.koiId} hoverable className="koi-detail-card">
            {koi.koiImages.map((image, imgIndex) => (
              <img
                key={imgIndex}
                width={135}
                height={200}
                alt={koi.koiName}
                src={`https://koidayne.azurewebsites.net/uploads/koi/${image.urlImage}`}
                className="koi-detail-image"
              />
            ))}

            <Title level={4}>{koi.koiName}</Title>
            <p>Price: {koi.price}</p>
            <p>Length: {koi.length} cm</p>
            <p>Year of Birth: {koi.yob}</p>
            <p>Gender: {koi.gender}</p>
          </Card>
        ))}
      </div>

      <RatingFarm farmId={farm.farmId} userId={userId} />
    </>
  );
}

export default FarmDetail;
