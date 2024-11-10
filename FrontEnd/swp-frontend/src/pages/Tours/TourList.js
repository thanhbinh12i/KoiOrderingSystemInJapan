import { useEffect, useState } from "react";
import { Button, Card, Col, Pagination, Row } from "antd";
import { get } from "../../utils/request";
import image from "../../assets/home/koi-farm-tour.jpg";
import { Link } from "react-router-dom";

function TourList() {
  const [tours, setTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

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
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredTours.slice(startIndex, startIndex + pageSize);
  };
  return (
    <>
      <div className="tour-list">
        <h1>Các chuyến đi có sẵn của chúng tôi</h1>
        <Row gutter={[16, 16]} className="tour-list__container">
          {getCurrentPageData().map((tour) => (
            <>
              <Col span={6} key={tour.tourId}>
                <Card hoverable cover={<img alt={tour.tourName} src={image} className="tour-list__card" />}>
                  <Card.Meta
                    title={tour.tourName}
                    description={`Khởi hành: ${tour.startTime} - Kết thúc: ${tour.finishTime}`}
                  />
                  <div className="tour-list__card-flex">
                    <div className="tour-list__card-participants">
                      Số người tham gia: {tour.numberOfParticipate}
                    </div>
                    <div className="tour-list__card-price">{tour.price.toLocaleString()} đ</div>
                  </div>
                  <Link to={`/tours/${tour.tourId}`}>
                    <button className="tour-list__card-details-button">Xem chi tiết</button>
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
                    className="tour-list__card-book-button"
                  >
                    <Button>Đặt tour</Button>
                  </Link>
                </Card>
              </Col>
            </>
          ))}
        </Row>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
          <Pagination
            current={currentPage}
            onChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
            }}
            total={filteredTours.length}
            pageSize={pageSize}
            showSizeChanger={false}
            showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} chuyến đi`}
          />
        </div>
      </div>
    </>
  );
}
export default TourList;
