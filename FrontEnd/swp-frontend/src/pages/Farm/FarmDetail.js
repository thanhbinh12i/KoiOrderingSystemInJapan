import { useParams } from 'react-router-dom';
import { Card, Descriptions, Rate, Typography, Space, Divider, Carousel } from 'antd';
import { EnvironmentOutlined, ClockCircleOutlined, MailOutlined, PhoneOutlined, StarOutlined, GlobalOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import banner1 from "../../assets/home/banner-1.jpg"
import banner2 from "../../assets/home/banner-2.jpg"
import banner3 from "../../assets/home/banner-3.jpg"
import banner4 from "../../assets/home/banner-4.jpg"
const { Title, Text } = Typography;

function FarmDetail() {
      const [farm, setFarm] = useState([]);
      const { id } = useParams();

      useEffect(() => {
            const fetchedFarm = {
                  FarmId: 1,
                  FarmName: "Dainichi Koi Farm",
                  Location: "Japan",
                  OpenHour: "08:00",
                  CloseHour: "18:00",
                  Email: "info@dainichi.com",
                  Hotline: "123-456-7890",
                  FarmImages: [banner1, banner2, banner3, banner4],
                  Introduction: "Dainichi Koi Farm là một trong những trang trại cá Koi nổi tiếng nhất tại Nhật Bản, với hơn 50 năm kinh nghiệm trong việc lai tạo và chăm sóc cá Koi chất lượng cao.",
                  AverageRating: 5,
            };
            setFarm(fetchedFarm);
      }, [id]);
      return (
            <>
                  <div className="farm-detail">
                        <Carousel autoplay>
                              {farm.FarmImages && farm.FarmImages.map((img, index) => (
                                    <div key={index}>
                                          <img src={img} alt={`${farm.FarmName} - Ảnh ${index + 1}`} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
                                    </div>
                              ))}
                        </Carousel>

                        <Card
                              className="farm-info-card"

                        >
                              <Title level={2}>{farm.FarmName}</Title>
                              <Divider />
                              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                                    <Descriptions column={1} labelStyle={{ fontWeight: 'bold' }}>
                                          <Descriptions.Item label={<Space><EnvironmentOutlined /> Địa điểm</Space>}>
                                                {farm.Location}
                                          </Descriptions.Item>
                                          <Descriptions.Item label={<Space><ClockCircleOutlined /> Giờ mở cửa</Space>}>
                                                {farm.OpenHour} - {farm.CloseHour}
                                          </Descriptions.Item>
                                          <Descriptions.Item label={<Space><MailOutlined /> Email</Space>}>
                                                {farm.Email}
                                          </Descriptions.Item>
                                          <Descriptions.Item label={<Space><PhoneOutlined /> Hotline</Space>}>
                                                {farm.Hotline}
                                          </Descriptions.Item>
                                          <Descriptions.Item label={<Space><GlobalOutlined /> Mô tả</Space>}>
                                                <strong>{farm.Introduction}</strong>
                                          </Descriptions.Item>
                                    </Descriptions>
                                    <Divider />
                                    <Space align="center">
                                          <StarOutlined />
                                          <Text strong>Đánh giá:</Text>
                                          <Rate disabled value={farm.AverageRating}/>
                                          <Text type="secondary">({farm.AverageRating})</Text>
                                    </Space>
                              </Space>
                        </Card>
                  </div>
            </>
      )
}
export default FarmDetail;