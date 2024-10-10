import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../../../utils/request";
import GoBack from "../../../components/GoBack";
import { Spin, message } from "antd";

function TourDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchApi = async () => {
    setLoading(true);
    try {
      const response = await get(`tour/view/${id}`);
      setData(response);
    } catch (error) {
      console.error("Error fetching tours:", error);
      message.error("Failed to load tours. Please try again.");
      setData(null);
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
      <div className="mb-20">
        <strong>Giá:</strong> {data.price} VND
      </div>
      <div className="mb-20">
        <strong>Thời gian bắt đầu:</strong> {data.startTime}
      </div>
      <div className="mb-20">
        <strong>Thời gian kết thúc:</strong> {data.finishTime}
      </div>
      <div className="mb-20">
        <strong>Số người tham gia:</strong> {data.numberOfParticipate}
      </div>
      <div className="mb-20">
        <strong>Trang trại trong chuyến đi:</strong>
        <ul>
          {data.tourDestinations.map((destination, index) => (
            <li key={index}>
              <strong>Tên trang trại:</strong> {destination.farmName}
              <br />
              <strong>Địa chỉ:</strong> {destination.address}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TourDetail;
