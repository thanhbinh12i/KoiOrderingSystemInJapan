import { useEffect, useMemo, useState } from "react";
import { Button, Card, Col, Row } from 'antd';
import { get } from "../../utils/request";

import image from "../../assets/home/koi-farm-tour.jpg"
import { Link } from "react-router-dom";
import SearchTour from "../../components/SearchTour";

function TourList() {
      const [tours, setTours] = useState([]);
      useEffect(() => {
            const fetchApi = async () => {
                  const response = await get("tour/view-all");
                  if (response) {
                        setTours(response);
                  }
            }
            fetchApi();
      });
      const filteredTours = useMemo(() => {
            return tours.filter(tour =>
                  tour.tourDestinations && tour.tourDestinations.some(dest => dest.type === "default" && dest.tourId === tour.tourId)
            );
      }, [tours]);
      return (
            <>

                  <Row gutter={[16, 16]}>
                        {filteredTours.map((tour) => (
                              <>
                                    <Col span={8} key={tour.tourId}>
                                          <Card
                                                hoverable
                                                cover={<img alt={tour.tourName} src={image} />}
                                          >
                                                <Card.Meta title={tour.tourName} description={`Khởi hành: ${tour.startTime} - Kết thúc: ${tour.finishTime}`} />
                                                <div className="price">{tour.price.toLocaleString()}đ</div>
                                                <div className="participants">Số người tham gia: {tour.numberOfParticipate}</div>
                                                <Link to={`/tours/${tour.tourId}`}>
                                                      <button className="details-button">Xem chi tiết</button>
                                                </Link>

                                                <Link to={`/book-tour/${tour.tourId}`}
                                                      state={{
                                                            tourName: tour.tourName,
                                                            startTime: tour.startTime,
                                                            finishTime: tour.finishTime,
                                                            numberOfParticipate: tour.numberOfParticipate,
                                                            price: tour.price
                                                      }}>
                                                      <Button>Đặt tour</Button>
                                                </Link>
                                          </Card>
                                    </Col>
                              </>
                        ))}
                  </Row>

            </>
      )
}
export default TourList;