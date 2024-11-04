import React, { useEffect, useState } from "react";
import { Card, Rate, Avatar, Typography, Carousel } from "antd";
import { LeftOutlined, RightOutlined, UserOutlined } from "@ant-design/icons";
import { get } from "../../utils/request";
import Title from "antd/es/typography/Title";

const { Text, Paragraph } = Typography;

function FeedbackCustomer() {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchApi = async () => {
    const response = await get("feedback/view-all");
    if (response) {
      const uniqueFeedbacks = response.reverse().reduce((acc, current) => {
        const existingFeedback = acc.find(
          (item) => item.userId === current.userId
        ).revẻ;
        if (!existingFeedback) {
          return [...acc, current];
        }
        return acc;
      }, []);

      const updated = await Promise.all(
        uniqueFeedbacks.map(async (fb) => {
          const fullName = await get(`account/${fb.userId}`);
          return { ...fb, fullName: fullName.fullName };
        })
      );

      if (updated) {
        const sortedFeedbacks = updated
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 6);
        setFeedbacks(sortedFeedbacks);
      }
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
        {feedbacks.map((feedback) => (
          <div key={feedback.feedbackId}>
            <Card className="feedback-card">
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
              {feedback.urlImage && (
                <div className="feedback-image">
                  <img
                    style={{ width: "100px", height: "100px" }}
                    src={`${process.env.REACT_APP_API_URL_UPLOAD}feedback/${feedback.urlImage}`}
                    alt="Feedback"
                  />
                </div>
              )}
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default FeedbackCustomer;
