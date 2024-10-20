import { Link, useLocation } from "react-router-dom";
import { get } from "../../utils/request";
import { useEffect, useMemo, useState } from "react";
import { Button, Card, Col, Row } from "antd";
import FormTour from "../../pages/Tours/FormTour";
import GoBack from "../GoBack";
import image from "../../assets/home/koi-farm-tour.jpg"

function TourResult() {
      const [searchResults, setSearchResults] = useState([]);
      const location = useLocation();

      useEffect(() => {
            const fetchSearchResults = async () => {
                  const queryParams = new URLSearchParams(location.search);
                  const farm = queryParams.get('farm');
                  const variety = queryParams.get('variety');
                  const priceMin = queryParams.get('priceMin');
                  const priceMax = queryParams.get('priceMax');

                  let results = [];

                  if (farm) {
                        const responseFarm = await get(`tour/view-farmId/${farm}`);
                        if (responseFarm) results = [...results, ...responseFarm];
                  }

                  if (variety) {
                        const responseVariety = await get(`tour/view-farmId/${variety}`);
                        if (responseVariety) results = [...results, ...responseVariety];
                  }

                  if (priceMin && priceMax) {
                        const priceResponse = await get(`tour/view/${priceMin}&&${priceMax}`);
                        if (priceResponse) results = [...results, ...priceResponse];
                  }

                  const uniqueResults = Array.from(new Set(results.map(a => a.tourId)))
                        .map(id => results.find(a => a.tourId === id));
                  setSearchResults(uniqueResults);
            };

            fetchSearchResults();
      }, [location.search]);
      const filteredTours = useMemo(() => {
            return searchResults.filter(tour =>
                  tour.tourDestinations && tour.tourDestinations.some(dest => dest.type === "default" && dest.tourId === tour.tourId)
            );
      }, [searchResults]);
      return (
            <>
                  <GoBack />
                  <h1>Kết quả tìm kiếm</h1>
                  <Row gutter={[16, 16]}>
                        {filteredTours.map((tour) => (
                              <Col span={8} key={tour.tourId}>
                                    <Card
                                          hoverable
                                          cover={<img alt={tour.tourName} src={image} />}
                                    >
                                          <Card.Meta title={tour.tourName} description={`Khởi hành: ${tour.startTime} - Kết thúc: ${tour.finishTime}`} />
                                          <div className="price">{tour.price.toLocaleString()}đ</div>
                                          <div className="participants">Số người tham gia: {tour.numberOfParticipate}</div>
                                          <Link to={`/tours/${tour.tourId}`}>
                                                <Button type="primary" className="details-button">Xem chi tiết</Button>
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
                        ))}
                  </Row>
                  <FormTour />
            </>
      )
}
export default TourResult;