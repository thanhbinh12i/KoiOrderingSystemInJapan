import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "antd";
import { get } from "../../utils/request";
import image from "../../assets/home/koi-farm-tour.jpg";
import { Link } from "react-router-dom";

function TourList() {
  const [tours, setTours] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await get("tour/view-all");
      if (response) {
        setTours(response);
      }
    };
    fetchApi();
  });
  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('-');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }

  const today = new Date();
  const fourDaysLater = new Date(today);
  fourDaysLater.setDate(today.getDate() + 4);

  const filteredTours = tours.filter(
    (tour) =>
      tour.tourDestinations.some((dest) => dest.type === "default" && dest.tourId === tour.tourId) &&
      parseDate(tour.startTime).getTime() > fourDaysLater.getTime()
  );
  return (
    <>
      <Row gutter={[16, 16]}>
        {filteredTours.map((tour) => (
          <>
            <Col span={6} key={tour.tourId}>
              <Card hoverable cover={<img alt={tour.tourName} src={image} />}>
                <Card.Meta
                  title={tour.tourName}
                  description={`Khởi hành: ${tour.startTime}
                  - Kết thúc: ${tour.finishTime}`}
                />
                <div className="price">{tour.price.toLocaleString()}đ</div>
                <div className="participants">
                  Số người tham gia: {tour.numberOfParticipate}
                </div>
                <Link to={`/tours/${tour.tourId}`}>
                  <button className="details-button">Xem chi tiết</button>
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
            </Col>
          </>
        ))}
      </Row>
    </>
  );
}
export default TourList;
