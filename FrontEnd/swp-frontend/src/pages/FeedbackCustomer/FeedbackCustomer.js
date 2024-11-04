import React, { useEffect, useState } from "react";
import { Card, Rate, Avatar, Typography, Carousel, Row, Col } from "antd";
import { LeftOutlined, RightOutlined, UserOutlined } from "@ant-design/icons";
import { get } from "../../utils/request";
import Title from "antd/es/typography/Title";

const { Text, Paragraph } = Typography;

function FeedbackCustomer() {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchApi = async () => {
    const response = await get("feedback/view-all");
    if (response) {
      const userResponse = await get(`account/view-all-user`);
      const uniqueFeedbacks = response.reverse().reduce((acc, current) => {
        const existingFeedback = acc.find(
          (item) => item.userId === current.userId
        );
        if (!existingFeedback) {
          const user = userResponse.find(
            (item) => item.userId === current.userId
          );
          acc.push({
            ...current,
            fullName: user.fullName,
          });
        }
        return acc;
      }, []);
      setFeedbacks(uniqueFeedbacks);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className="feedback-section">
      <Title
        level={2}
        className="feedback-title"
        style={{ textAlign: "center" }}
      >
        Được khách hàng ghi nhận
      </Title>
      <Paragraph className="feedback-subtitle" style={{ textAlign: "center" }}>
        Sự hài lòng của khách hàng là thứ chúng tôi luôn mong muốn ❤️
      </Paragraph>

      <Carousel
        arrows
        prevArrow={<LeftOutlined />}
        nextArrow={<RightOutlined />}
        slidesToShow={2}
        autoplay
        className="feedback-carousel"
        responsive={[
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
            },
          },
        ]}
      >
        {feedbacks.slice(0, 3).map((feedback) => (
          <div key={feedback.feedbackId}>
            <Card className="feedback-card">
              <Row gutter={16}>
                <Col span={12}>
                  <div className="feedback-user">
                    <Avatar size={64} icon={<UserOutlined />} />
                    <div className="feedback-user-info">
                      <Text strong>{feedback.fullName}</Text>
                      <Rate disabled defaultValue={feedback.rating} />
                    </div>
                  </div>
                  <Paragraph className="feedback-content">
                    {feedback.content}
                  </Paragraph>
                </Col>
                <Col span={12}>
                  {feedback.urlImage && (
                    <div className="feedback-image">
                      <img
                        style={{ width: "300px", height: "150px" }}
                        src={`${process.env.REACT_APP_API_URL_UPLOAD}feedback/${feedback.urlImage}`}
                        alt="Feedback"
                      />
                    </div>
                  )}
                </Col>
              </Row>
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default FeedbackCustomer;
