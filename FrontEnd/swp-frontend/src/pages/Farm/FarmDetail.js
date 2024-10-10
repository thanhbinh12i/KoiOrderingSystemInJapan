import { useParams } from 'react-router-dom';
import { Card, Descriptions, Rate, Typography, Space, Divider, Carousel } from 'antd';
import { EnvironmentOutlined, ClockCircleOutlined, MailOutlined, PhoneOutlined, StarOutlined, GlobalOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { get } from '../../utils/request';
import GoBack from '../../components/GoBack';
const { Title, Text } = Typography;

function FarmDetail() {
      const [farm, setFarm] = useState([]);
      const params = useParams();

      useEffect(() => {
            const fetchApi = async () => {
                  const response = await get(`koiFarm/view/${params.id}`);
                  if (response) {
                        setFarm(response);
                  }
            }
            fetchApi();
      }, [params.id]);
      return (
            <>
                  <GoBack />
                  <div className="farm-detail">
                        <Carousel autoplay>
                              {farm.farmImages && farm.farmImages.map((img, index) => (
                                    <div key={index}>
                                          <img src={`https://localhost:7087/uploads/koiFarm/${img.urlImage}`} alt={`${farm.farmName} - Ảnh ${index + 1}`} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
                                    </div>
                              ))}
                        </Carousel>

                        <Card
                              className="farm-info-card"

                        >
                              <Title level={2}>{farm.farmName}</Title>
                              <Divider />
                              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                                    <Descriptions column={1} labelStyle={{ fontWeight: 'bold' }}>
                                          <Descriptions.Item label={<Space><EnvironmentOutlined /> Địa điểm</Space>}>
                                                <strong>{farm.location}</strong>
                                          </Descriptions.Item>
                                          <Descriptions.Item label={<Space><ClockCircleOutlined /> Giờ mở cửa</Space>}>
                                                <strong>{farm.openHour} - {farm.closeHour}</strong>
                                          </Descriptions.Item>
                                          <Descriptions.Item label={<Space><MailOutlined /> Email</Space>}>
                                                <strong>{farm.email}</strong>
                                          </Descriptions.Item>
                                          <Descriptions.Item label={<Space><PhoneOutlined /> Hotline</Space>}>
                                                <strong>{farm.hotline}</strong>
                                          </Descriptions.Item>
                                          <Descriptions.Item label={<Space><GlobalOutlined /> Mô tả</Space>}>
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
                  </div >
            </>
      )
}
export default FarmDetail;