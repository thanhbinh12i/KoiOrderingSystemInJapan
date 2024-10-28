import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Typography, Card, Image } from "antd";
import { get } from "../../utils/request";
import "./Koi.scss";
import GoBack from "../../components/GoBack";

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
    <>
      <GoBack />
      <div className="koi-detail-container">
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <div className="koi-image-container">
              <Image
                src={`${process.env.REACT_APP_API_URL_UPLOAD}koi/${selectedImage}`}
                alt={koi.koiName}
                className="koi-main-image"
              />
              <div className="image-thumbnails">
                {koi.koiImages.map((image) => (
                  <img
                    key={image.koiImageId}
                    src={`${process.env.REACT_APP_API_URL_UPLOAD}koi/${image.urlImage}`}
                    alt={`${koi.koiName} thumbnail`}
                    className={`thumbnail ${selectedImage === image.urlImage ? "active" : ""
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
                Giá tiền: {koi.price.toLocaleString()} đ
              </Title>
              <Paragraph>Trang trại: {koi.farmName}</Paragraph>
              <Paragraph>Giới tính: {koi.gender}</Paragraph>
              <Paragraph>Ngày sinh: {koi.yob}</Paragraph>
              <Paragraph>Chiều dài: {koi.length}</Paragraph>
              <Paragraph>Giống cá: {koi.variety}</Paragraph>
              <Paragraph>
                Ngày đăng: {new Date(koi.updateDate).toLocaleString()}
              </Paragraph>

              <Paragraph>
                Mô tả <br />
                {koi.description}
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default KoiDetailById;
