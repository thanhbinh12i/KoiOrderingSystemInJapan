import GoBack from "../../../components/GoBack";
import { get } from "../../../utils/request";
import { Image } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function FarmDetail() {
  const params = useParams();
  const [data, setData] = useState();
  //   const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await get(`koiFarm/view/${params.id}`);
      if (response) {
        setData(response);
      }
    };
    //     const fetchKoiFarmImages = async () => {
    //       const response = await get(`farmImage/view/${params.id}`);
    //       if (response) {
    //         setImages(response);
    //       }
    //     };
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([
        fetchApi(),
        // , fetchKoiFarmImages()
      ]);
      setLoading(false);
    };

    fetchData();
  }, [params.id]);
  console.log(data);
  return (
    <>
      <GoBack />
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
            Hotline <strong>{data.hotline}</strong>
          </div>
          <div className="mb-20">
            {data && (
              <div className="mb-20">
                <h2>Hình ảnh</h2>
                <Image.PreviewGroup>
                  {data.farmImages.map((image, index) => (
                    <Image
                      key={image.id || index}
                      src={`/api/farmImage/view/${image.farmImageId}`}
                      alt={`Koi farm ${index + 1}`}
                      width={200}
                      className="mr-10 mb-10"
                    />
                  ))}
                </Image.PreviewGroup>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
export default FarmDetail;
