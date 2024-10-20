import { Card, Rate } from "antd";
import { EnvironmentOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Farm.scss";
import { get } from "../../utils/request";

function Farm() {
  const [farms, setFarms] = useState([]);
  const AverageRating = 5;
  useEffect(() => {
    const fetchApi = async () => {
      const response = await get("koiFarm/view-all");
      if (response) {
        setFarms(response);
      }
    };
    fetchApi();
  }, []);
  return (
    <>
      <div className="farm">
        <div className="farm-list">
          {farms.map((farm) => (
            <Link
              to={`/farms/${farm.farmId}`}
              key={farm.farmId}
              className="farm-link"
            >
              <Card className="farm-card">
                <div className="farm-card-content">
                  <div className="farm-info">
                    <h2>{farm.farmName}</h2>
                    <div className="farm-details">
                      <p>
                        <EnvironmentOutlined /> {farm.location}
                      </p>
                      <p>
                        <ClockCircleOutlined /> {farm.openHour} -{" "}
                        {farm.closeHour}
                      </p>
                    </div>
                    <Rate disabled defaultValue={AverageRating} />
                  </div>
                  <div className="farm-image">
                    <img
                      alt={farm.FarmName}
                      src={`https://koidayne.azurewebsites.net/uploads/koiFarm/${farm.farmImages[0].urlImage}`}
                    />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
export default Farm;
