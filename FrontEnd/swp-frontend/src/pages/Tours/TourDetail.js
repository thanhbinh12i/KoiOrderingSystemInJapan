import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../../utils/request";
import { Card, Descriptions, Rate, Typography, Space, Divider } from 'antd';
import { ClockCircleOutlined, MailOutlined, PhoneOutlined, StarOutlined, GlobalOutlined } from '@ant-design/icons';
import GoBack from "../../components/GoBack";

const { Title, Text } = Typography;

function TourDetail() {
      const params = useParams();
      const [tour, setTour] = useState(null);
      const [farm, setFarm] = useState([]);
      useEffect(() => {
            const fetchApi = async () => {
                  const response = await get(`tour/view/${params.id}`);
                  if (response) {
                        setTour(response);
                  }
            }
            fetchApi();
      }, [params.id])
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
            }
            fetchApi();
      }, [params.id])
      console.log(farm);
      return (
            <>
                  <GoBack />
                  {tour && (
                        <>
                              <Card
                                    className="tour-info-card"
                              >
                                    <Title level={2}>{tour.tourName}</Title>
                                    <Divider />
                                    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                                          <Descriptions column={1} labelStyle={{ fontWeight: 'bold' }}>
                                                <Descriptions.Item label={<Space><ClockCircleOutlined /> Thời gian</Space>}>
                                                      <strong>{tour.startTime} đến {tour.finishTime}</strong>
                                                </Descriptions.Item>
                                                <Descriptions.Item label={<Space><MailOutlined /> Số lượng người tham gia</Space>}>
                                                      <strong>{tour.numberOfParticipate}</strong>
                                                </Descriptions.Item>
                                                <Descriptions.Item label={<Space><PhoneOutlined /> Giá</Space>}>
                                                      <strong>{tour.price}</strong>
                                                </Descriptions.Item>
                                                <Descriptions.Item label={<Space><GlobalOutlined /> Các trang trại tham quan</Space>}>
                                                      {farm.map((item) => (
                                                            <div>
                                                                  <strong> - {item.farmName} - </strong>
                                                            </div>
                                                      ))}
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
                        </>
                  )}
            </>
      )
}
export default TourDetail;