import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Typography, Card, Image } from "antd";
import { get } from "../../utils/request";
import "./Koi.scss";

const { Title, Paragraph } = Typography;

function KoiDetailById() {
  const [koi, setKoi] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const koi = await get(`koi/view-by-id/${id}`);
        const farmResponse = await get(`koiFarm/view/${koi.farmId}`);
        const varietyRes = await get(`koi-variable/view-by-koi-id/${id}`);
        const updatedKoiData = {
          ...koi,
          farmName: farmResponse.farmName,
          variety: varietyRes[0].varietyName,
        };

        setKoi(updatedKoiData);
        setSelectedImage(updatedKoiData.koiImages[0]?.urlImage);
      } catch (error) {
        console.error("Error fetching Koi:", error);
      }
    };

    fetchAPI();
  }, [id]);

  if (!koi) return <p>Loading...</p>;

  return (
    <div className="koi-detail-container">
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <div className="koi-image-container">
            <Image
              src={`https://localhost:7087/uploads/koi/${selectedImage}`}
              alt={koi.koiName}
              className="koi-main-image"
            />
            <div className="image-thumbnails">
              {koi.koiImages.map((image) => (
                <img
                  key={image.koiImageId}
                  src={`https://localhost:7087/uploads/koi/${image.urlImage}`}
                  alt={`${koi.koiName} thumbnail`}
                  className={`thumbnail ${
                    selectedImage === image.urlImage ? "active" : ""
                  }`}
                  onClick={() => setSelectedImage(image.urlImage)}
                />
              ))}
            </div>
          </div>
        </Col>
        <Col xs={24} md={12}>
          <Card className="koi-info-card">
            <Title level={2}>{koi.koiName}</Title>
            <Title level={4} className="starting-bid">
              Giá tiền: ${koi.price}
            </Title>
            <Paragraph>Trang trại: (s): {koi.farmName}</Paragraph>
            <Paragraph>Giới tính: {koi.gender}</Paragraph>
            <Paragraph>Ngày sinh: {koi.yob}</Paragraph>
            <Paragraph>Chiều dài: {koi.length}</Paragraph>
            <Paragraph>Giống cá: {koi.variety}</Paragraph>
            <Paragraph>
              Ngày đăng: {new Date(koi.updateDate).toLocaleString()}
            </Paragraph>
            <div className="login-register">
              <>
                <Title level={5}>You must login/register to purchase koi</Title>
                <a href="/login">Login</a>
                <a href="/register">Register</a>
              </>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default KoiDetailById;
