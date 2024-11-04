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
        if (responseFarm) results = [...results, ...responseFarm];
      }

      if (variety) {
        const responseVariety = await get(`tour/view-farmId/${variety}`);
        if (responseVariety) results = [...results, ...responseVariety];
      }

      if (priceMin == null && priceMax) {
        priceMin = 0;
        const priceResponse = await get(
          `tour/view-price/${priceMin}&&${priceMax}`
        );
        if (priceResponse) results = [...results, ...priceResponse];
      }
      if (priceMin && priceMax == null) {
        priceMax = 9999999999;
        const priceResponse = await get(
          `tour/view-price/${priceMin}&&${priceMax}`
        );
        if (priceResponse) results = [...results, ...priceResponse];
      }
      if (startDate && endDate) {
        const dateResponse = await get(
          `tour/view-date/${startDate}&&${endDate}`
        );
        if (dateResponse) results = [...results, ...dateResponse];
      }
      console.log(results);

      const uniqueResults = Array.from(
        new Set(results.map((a) => a.tourId))
      ).map((id) => results.find((a) => a.tourId === id));
      setSearchResults(uniqueResults);
    };

    fetchSearchResults();
  }, [location.search]);
  // const filteredTours = useMemo(() => {
  //   return searchResults.filter(
  //     (tour) =>
  //       !tour.tourDestinations.length ||
  //       tour.tourDestinations.some(
  //         (dest) => dest.type === "default" && dest.tourId === tour.tourId
  //       )
  //   );
  // }, [searchResults]);
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
      <Row gutter={[16, 16]}>
        {filteredTours.map((tour) => (
          <Col span={6} key={tour.tourId}>
            <div className="Card">
              <Card hoverable cover={<img alt={tour.tourName} src={image} />}>
                <Card.Meta
                  title={tour.tourName}
                  description={`Khởi hành: ${tour.startTime} - Kết thúc: ${tour.finishTime}`}
                />
                <div className="price">{tour.price.toLocaleString()}đ</div>
                <div className="participants">
                  Số người tham gia: {tour.numberOfParticipate}
                </div>
                <Link to={`/tours/${tour.tourId}`}>
                  <Button type="primary" className="details-button">
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
                  <Button>Đặt tour</Button>
                </Link>
              </Card>
            </div>
          </Col>
        ))}
      </Row>
      <div className="formTour">
        <FormTour />
      </div>
    </>
  );
}
export default TourResult;
