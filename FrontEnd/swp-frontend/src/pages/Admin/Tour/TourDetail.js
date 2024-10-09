import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../../../utils/request";
import GoBack from "../../../components/GoBack";
import { Spin, message } from "antd";

function TourDetail() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApi = async () => {
    setLoading(true);
    try {
      const response = await get(`tour/view/${id}`);
      setData(response);
    } catch (error) {
      console.error("Error fetching tours:", error);
      message.error("Failed to load tours. Please try again.");

      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Spin size="large" />;
  }

  if (!data) {
    return <div>Không tìm thấy thông tin tour.</div>;
  }

  return (
    <div className="tour-detail">
      <GoBack />
      <h1>{data.tourName}</h1>
      <div className="info-item">
        <strong>Giá:</strong> {data.price} VND
      </div>
      <div className="info-item">
        <strong>Thời gian bắt đầu:</strong> {data.startTime}
      </div>
      <div className="info-item">
        <strong>Thời gian kết thúc:</strong> {data.finishTime}
      </div>
      <div className="info-item">
        <strong>Số người tham gia:</strong> {data.numberOfParticipate}
      </div>
    </div>
  );
}

export default TourDetail;
