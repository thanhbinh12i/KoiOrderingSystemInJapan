import { Card, Rate } from 'antd';
import { EnvironmentOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import banner1 from "../../assets/home/banner-1.jpg"
import banner2 from "../../assets/home/banner-2.jpg"
import banner3 from "../../assets/home/banner-3.jpg"
import banner4 from "../../assets/home/banner-4.jpg"
import "./Farm.scss"

function Farm() {
      const [farms, setFarms] = useState([]);

      useEffect(() => {
            setFarms([
                  {
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
                  },
                  {
                        FarmId: 2,
                        FarmName: "Nigiita",
                        Location: "Japan",
                        OpenHour: "09:00",
                        CloseHour: "17:00",
                        Email: "contact@nigiita.com",
                        Hotline: "987-654-3210",
                        FarmImages: [banner1, banner2, banner3, banner4],
                        Introduction: "Nigiita Koi Farm là một trong những trang trại cá Koi nổi tiếng nhất tại Nhật Bản, với hơn 50 năm kinh nghiệm trong việc lai tạo và chăm sóc cá Koi chất lượng cao.",
                        AverageRating: 4.2,
                  },
            ]);
      }, []);
      return (
            <>
                  <div className='farm'>
                        <div className="farm-list">
                              {farms.map((farm) => (
                                    <Link to={`/farms/${farm.FarmId}`} key={farm.FarmId} className="farm-link">
                                          <Card className="farm-card">
                                                <div className="farm-card-content">
                                                      <div className="farm-info">
                                                            <h2>{farm.FarmName}</h2>
                                                            <div className="farm-details">
                                                                  <p><EnvironmentOutlined /> {farm.Location}</p>
                                                                  <p><ClockCircleOutlined /> {farm.OpenHour} - {farm.CloseHour}</p>
                                                            </div>
                                                            <Rate disabled defaultValue={farm.AverageRating} />
                                                      </div>
                                                      <div className="farm-image">
                                                            <img alt={farm.FarmName} src={banner1} />
                                                      </div>
                                                </div>
                                          </Card>
                                    </Link>
                              ))}
                        </div>
                  </div>

            </>
      )
}
export default Farm;