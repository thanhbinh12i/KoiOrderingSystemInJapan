import GoBack from "../../../components/GoBack";
import { get } from "../../../utils/request";
import { Image, Spin } from "antd";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

function FarmDetail() {
  const params = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const fetchApi = useCallback(async () => {
    const response = await get(`koiFarm/view/${params.id}`);
    if (response) {
      setData(response);
    }
  }, [params.id]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchApi()]);
      setLoading(false);
    };

    fetchData();
  }, [fetchApi]);

  return (
    <>
      <GoBack />

      <Spin spinning={loading} tip="Đang tải...">
        {data && (
          <>
            <h1>{data.farmName}</h1>
            <div className="mb-20">
              Giới thiệu: <strong>{data.introduction}</strong>
            </div>
            <div className="mb-20">
              Địa chỉ: <strong>{data.location}</strong>
            </div>
            <div className="mb-20">
              Giờ mở cửa: <strong>{data.openHour}</strong>
            </div>
            <div className="mb-20">
              Giờ đóng cửa: <strong>{data.closeHour}</strong>
            </div>
            <div className="mb-20">
              Email liên hệ: <strong>{data.email}</strong>
            </div>
            <div className="mb-20">
              Hotline: <strong>{data.hotline}</strong>
            </div>

            <div className="mb-20">
              <h2>Hình ảnh</h2>
              <Image.PreviewGroup>
                {data.farmImages &&
                  data.farmImages.map((image, index) => (
                    <Image
                      key={index}
                      src={`https://koidayne.azurewebsites.net/uploads/koiFarm/${image.urlImage}`}
                      alt={`Koi farm ${index + 1}`}
                      width={200}
                      className="mr-10 mb-10"
                    />
                  ))}
              </Image.PreviewGroup>
            </div>
          </>
        )}
      </Spin>
    </>
  );
}

export default FarmDetail;
