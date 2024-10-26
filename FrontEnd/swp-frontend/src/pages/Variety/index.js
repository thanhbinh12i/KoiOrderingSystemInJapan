import React, { useState, useEffect } from "react";
import { Card, Row, Col, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import "./Variety.scss";
import { get } from "../../utils/request";

const { Title, Paragraph } = Typography;

function Variety() {
  const [varieties, setVarieties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVarieties = async () => {
      try {
        const response = await get("koi-variable/view-all");
        setVarieties(response);
      } catch (error) {
        console.error("Error fetching varieties:", error);
      }
    };

    fetchVarieties();
  }, []);

  const handleCardClick = (varietyName) => {
    navigate(`/varieties/${varietyName}`);
  };

  return (
    <Row gutter={[16, 16]} className="variety-container">
      {varieties.map((variety) => (
        <Col xs={24} sm={12} md={8} key={variety.varietyId}>
          <Card
            hoverable
            className="variety-card"
            onClick={() => handleCardClick(variety.varietyName)}
          >
            <img
              width={135}
              height={200}
              alt={variety.varietyName}
              src={`https://koidayne.azurewebsites.net/uploads/koiVariety/${variety.urlImage}`}
              className="variety-image"
            />
            <Title level={4}>{variety.varietyName}</Title>
            <Paragraph>{variety.description}</Paragraph>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Variety;
