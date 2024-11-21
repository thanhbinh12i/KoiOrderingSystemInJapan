import { Timeline, Typography } from "antd";
import { CalendarOutlined, EnvironmentOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;
export default function TourSchedule(props) {
      const { tour, farm } = props;
      const formatDate = (dateString, index) => {
            if (index === 0) return "Ngày 1";
            if (index === -1) return "Ngày cuối"; // Cho ngày cuối cùng
            return `Ngày ${index + 1}`;
      };

      const formatTime = (dateString) => {
            const [day, month, year] = dateString.split('-');
            const date = new Date(`${year}-${month}-${day}`);

            return date.toLocaleTimeString('vi-VN', {
                  hour: '2-digit',
                  minute: '2-digit'
            });
      };

      const renderFarmPreview = (farm) => {
            if (!farm) return null;
            return (
                  <div className="farm-preview">
                        <img
                              src={`${process.env.REACT_APP_API_URL_UPLOAD}koiFarm/${farm.farmImages[0].urlImage}`}
                              alt={farm.farmName}
                              className="farm-schedule-image"
                        />
                        <div className="farm-schedule-info">
                              <Title level={4}>{farm.farmName}</Title>
                              <Text>
                                    <EnvironmentOutlined /> {farm.location}
                              </Text>
                        </div>
                  </div>
            );
      };

      const getDatesInBetween = (startDate, endDate) => {
            const start = new Date(startDate.split('-').reverse().join('-'));
            const end = new Date(endDate.split('-').reverse().join('-'));

            const dates = [];
            const currentDate = new Date(start);
            currentDate.setDate(currentDate.getDate() + 1);

            while (currentDate < end) {
                  dates.push(new Date(currentDate));
                  currentDate.setDate(currentDate.getDate() + 1);
            }

            return dates;
      };

      const renderDaySchedule = (date, farmIndex, isFirst, isLast) => {

            if (isFirst) {
                  return (
                        <ul className="schedule-details">
                              <li>{formatTime(tour.startTime)} - Tập trung tại sân bay</li>
                              <li>Làm thủ tục check-in và lên máy bay</li>
                              <li>Xe đón và đưa về khách sạn</li>
                              <li>Check-in khách sạn và nghỉ ngơi</li>
                              {farm[0] && <li>14:00 - Tham quan trang trại {farm[0].farmName}</li>}
                              <li>18:00 - Về khách sạn, ăn tối và nghỉ ngơi</li>
                        </ul>
                  );
            }

            if (isLast) {
                  return (
                        <ul className="schedule-details">
                              <li>07:00 - Ăn sáng tại khách sạn</li>
                              <li>08:00 - Check-out khách sạn</li>
                              <li>09:00 - Free time để mua sắm</li>
                              <li>12:00 - Di chuyển ra sân bay</li>
                              <li>{formatTime(tour.finishTime)} - Kết thúc chương trình</li>
                        </ul>
                  );
            }

            return (
                  <ul className="schedule-details">
                        <li>07:00 - Ăn sáng tại khách sạn</li>
                        {farmIndex < farm.length ? (
                              <>
                                    <li>09:00 - Tham quan trang trại {farm[farmIndex].farmName}</li>
                                    <li>12:00 - Ăn trưa</li>
                                    <li>14:00 - Tiếp tục tham quan</li>
                              </>
                        ) : (
                              <>
                                    <li>09:00 - Free time</li>
                                    <li>12:00 - Ăn trưa</li>
                                    <li>14:00 - Tự do khám phá thành phố</li>
                              </>
                        )}
                        <li>17:00 - Về khách sạn, ăn tối và nghỉ ngơi</li>
                  </ul>
            );
      };

      return (
            <div className="schedule-section">
                  <Title level={3}>
                        <CalendarOutlined /> Lịch trình tour
                  </Title>
                  <Timeline>
                        <Timeline.Item color="blue">
                              <Title level={5}>{formatDate(tour.startTime, 0)}</Title>
                              <div className="farm-schedule-container">
                                    {renderFarmPreview(farm[0])}
                                    {renderDaySchedule(tour.startTime, 0, true, false)}
                              </div>
                        </Timeline.Item>

                        {getDatesInBetween(tour.startTime, tour.finishTime).map((date, index) => (
                              <Timeline.Item color="green" key={index}>
                                    <Title level={5}>{formatDate(date, index + 1)}</Title>
                                    <div className="farm-schedule-container">
                                          {farm[index + 1] && renderFarmPreview(farm[index + 1])}
                                          {renderDaySchedule(date, index + 1, false, false)}
                                    </div>
                              </Timeline.Item>
                        ))}

                        <Timeline.Item color="red">
                              <Title level={5}>{formatDate(tour.finishTime, -1)}</Title>
                              <div className="farm-schedule-container">
                                    {renderDaySchedule(tour.finishTime, farm.length - 1, false, true)}
                              </div>
                        </Timeline.Item>
                  </Timeline>
            </div>
      );
}