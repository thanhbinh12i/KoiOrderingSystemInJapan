import React, { useState, useEffect } from "react";
import { Card, Typography, Spin, Col, Row } from "antd";
import { useParams } from "react-router-dom";
import { get } from "../../utils/request";
import "./KoiByVariety.scss";
import GoBack from "../../components/GoBack";

const { Title } = Typography;

const KoiByVariety = () => {
  const param = useParams();
  const [koiData, setKoiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [variety, setVariety] = useState(null);
  useEffect(() => {
    const fetchKoiByVariety = async () => {
      try {
        const response = await get(`koi/view-by-variety/${param.name}`);
        const res = await get(`koi-variable/view-by-name/${param.name}`);
        if (response && res) {
          setKoiData(response);
          setVariety(res);
        }
      } catch (error) {
        console.error("Error fetching Koi data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKoiByVariety();
  }, [param.name]);

  if (loading) {
    return <Spin tip="Loading Koi data..." />;
  }

  if (koiData.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <>
      <div className="koi__introduction">
        <GoBack />
        <Row gutter={20}>
          <Col span={3}></Col>
          <Col span={9}>
            <Card>
              <h2>{variety[0].varietyName}</h2>
              <p>{variety[0].description}</p>
            </Card>
          </Col>
          <Col span={9}>
            <Card
              key={variety[0].varietyId}
              hoverable
              className="koiVariable__card"
            >
              <img
                alt={variety[0].varietyName}
                width={135}
                src={`${process.env.REACT_APP_API_URL_UPLOAD}koiVariety/${variety[0].urlImage}`}
              />
            </Card>
          </Col>
          <Col span={3}></Col>
        </Row>
      </div>
      <h2 className="koi-list">Danh sách cá Koi trong giống {param.name}</h2>
      <div className="koi-by-variety-container">
        {koiData.map((koi, index) => (
          <Card key={index} hoverable className="koi-detail-card">
            {koi.koiImages && koi.koiImages.length > 0 ? (
              <img
                key={koi.koiId}
                width={135}
                height={200}
                alt={koi.koiName}
                src={`${process.env.REACT_APP_API_URL_UPLOAD}koi/${koi.koiImages[0].urlImage}`}
                className="koi-detail-image"
              />
            ) : (
              <p>No images available</p>
            )}
            <Title level={4}>{koi.koiName}</Title>
            <p>Price: {koi.price}</p>
            <p>Length: {koi.length} cm</p>
            <p>Year of Birth: {koi.yob}</p>
            <p>Gender: {koi.gender}</p>
          </Card>
        ))}
      </div>
    </>
  );
};

export default KoiByVariety;
