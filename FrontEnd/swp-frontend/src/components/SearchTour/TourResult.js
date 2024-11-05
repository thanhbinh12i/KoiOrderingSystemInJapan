import { Link, useLocation } from "react-router-dom";
import { get } from "../../utils/request";
import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "antd";
import FormTour from "../../pages/Tours/FormTour";
import GoBack from "../GoBack";
import image from "../../assets/home/koi-farm-tour.jpg";
import "./TourResult.scss";
function TourResult() {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const getIntersection = (arr1, arr2) => {
    if (!arr1 || arr1.length === 0) return arr2;
    if (!arr2 || arr2.length === 0) return arr1;
    return arr1.filter(item => arr2.some(item2 => item2.tourId === item.tourId));
  };
  useEffect(() => {
    const fetchSearchResults = async () => {
      const queryParams = new URLSearchParams(location.search);
      const farm = queryParams.get("farm");
      const variety = queryParams.get("variety");
      var priceMin = queryParams.get("priceMin");
      var priceMax = queryParams.get("priceMax");
      const startDate = queryParams.get("startDate");
      const endDate = queryParams.get("endDate");
      let results = [];

      if (farm) {
        const responseFarm = await get(`tour/view-farmId/${farm}`);
        results = getIntersection(results, responseFarm);
      }

      if (variety) {
        const responseVariety = await get(`tour/view-farmId/${variety}`);
        results = getIntersection(results, responseVariety);
      }

      if (priceMin == null && priceMax) {
        const priceResponse = await get(`tour/view-price/0&&${priceMax}`);
        results = getIntersection(results, priceResponse);
      }

      if (priceMin && priceMax == null) {
        const priceResponse = await get(`tour/view-price/${priceMin}&&9999999999`);
        results = getIntersection(results, priceResponse);
      }
      if (priceMin && priceMax) {
        const priceResponse = await get(`tour/view-price/${priceMin}&&${priceMax}`);
        results = getIntersection(results, priceResponse);
      }

      if (startDate && endDate) {
        const dateResponse = await get(`tour/view-date/${startDate}&&${endDate}`);
        results = getIntersection(results, dateResponse);
      }
      setSearchResults(results);
    };

    fetchSearchResults();
  }, [location.search]);
  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('-');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }

  const today = new Date();

  const filteredTours = searchResults.filter(
    (tour) =>
      tour.tourDestinations &&
      tour.tourDestinations.some(
        (dest) => dest.type === "default" && dest.tourId === tour.tourId
      ) &&
      parseDate(tour.startTime).getTime() > today.getTime()
  );
  return (
    <>
      <GoBack />
      <h1>Kết quả tìm kiếm</h1>
      <div className="tour-result">
        <Row gutter={[16, 16]}>
          {filteredTours.map((tour) => (
            <Col span={6} key={tour.tourId}>
              <div className="tour-result__card">
                <Card hoverable cover={<img alt={tour.tourName} src={image} />}>
                  <Card.Meta
                    title={tour.tourName}
                    description={`Khởi hành: ${tour.startTime} - Kết thúc: ${tour.finishTime}`}
                  />
                  <div className="tour-result__price">{tour.price.toLocaleString()}đ</div>
                  <div className="tour-result__participants">
                    Số người tham gia: {tour.numberOfParticipate}
                  </div>
                  <Link to={`/tours/${tour.tourId}`}>
                    <Button type="primary" className="tour-result__details-button">
                      Xem chi tiết
                    </Button>
                  </Link>
                  <Link
                    to={`/book-tour/${tour.tourId}`}
                    state={{
                      tourName: tour.tourName,
                      startTime: tour.startTime,
                      finishTime: tour.finishTime,
                      numberOfParticipate: tour.numberOfParticipate,
                      price: tour.price,
                    }}
                  >
                    <Button className="tour-result__book-button">Đặt tour</Button>
                  </Link>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      </div>
      <div className="formTour">
        <FormTour />
      </div>
    </>
  );
}
export default TourResult;
