import React, { useState, useEffect } from "react";
import { Card, Typography, Spin } from "antd";
import { useParams } from "react-router-dom";
import { get } from "../../utils/request";
import "./KoiByVariety.scss";

const { Title } = Typography;

const KoiByVariety = () => {
  const param = useParams();
  const [koiData, setKoiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKoiByVariety = async () => {
      try {
        const response = await get(`koi/view-by-variety/${param.name})`);
        setKoiData(response);
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
    <div className="koi-by-variety-container">
      {koiData.map((koi, index) => (
        <Card key={index} hoverable className="koi-detail-card">
          {koi.koiImages && koi.koiImages.length > 0 ? (
            koi.koiImages.map((image, imgIndex) => (
              <img
                key={imgIndex}
                width={135}
                height={200}
                alt={koi.koiName}
                src={`https://koidayne.azurewebsites.net/uploads/koi/${image.urlImage}`}
                className="koi-detail-image"
              />
            ))
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
  );
};

export default KoiByVariety;
