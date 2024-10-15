import React, { useState, useEffect } from "react";
import { Card, Row, Col, Typography } from "antd";
import "./Koi.scss";
import { get } from "../../utils/request";

const { Title, Paragraph } = Typography;

function Koi() {
  const [koi, setKoi] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await get("koi/view-all");
        setKoi(response);
      } catch (error) {
        console.error("Error fetching Koi:", error);
      }
    };

    fetchAPI();
  }, []);

  return (
    <Row gutter={[16, 16]} className="koi-container">
      {koi.map((koi) => (
        <Col xs={24} sm={12} md={8} key={koi.koiId}>
          <Card hoverable className="koi-card">
            {koi.koiImages.map((image) => (
              <img
                key={image.koiImageId}
                width={135}
                height={200}
                alt={koi.koiName}
                src={`https://localhost:7087/uploads/koi/${image.urlImage}`}
                className="koi-image"
              />
            ))}
            <Title level={4}>Tên cá koi: {koi.koiName}</Title>
            <Title level={5}>Giá: {koi.price}</Title>
            <Title level={5}>Số lượng: {koi.quantity}</Title>
            <Title level={5}>Ngày đẻ: {koi.yob}</Title>
            <Title level={5}>Giới tính: {koi.gender}</Title>
            <Title level={5}>Ngày đăng: {koi.updateDate}</Title>
            <Title level={5}>Trang trại: {koi.farmId}</Title>

            <Paragraph>
              Mô tả <br />
              {koi.description}
            </Paragraph>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Koi;
