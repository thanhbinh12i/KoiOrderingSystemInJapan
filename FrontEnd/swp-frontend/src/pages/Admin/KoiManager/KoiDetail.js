import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../../../utils/request";
import GoBack from "../../../components/GoBack";
import { Image } from "antd";

function KoiDetail() {
  const params = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    const id = params.id;

    const fetchApi = async () => {
      try {
        const response = await get(`koi/view-by-id/${id}`);
        if (response) {
          setData(response);
        } else {
          console.error("Không tìm thấy dữ liệu cho koi");
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu koi:", error);
      }
    };
    fetchApi();
  }, [params.id]);

  return (
    <>
      <GoBack />
      {data && (
        <>
          <h1>{data.koiName}</h1>
          <div className="mb-20">
            Giá tiền: <strong>{data.price}đ</strong>
          </div>
          <div className="mb-20">
            Độ dài: <strong>{data.length} cm</strong>
          </div>
          <div className="mb-20">
            Năm sinh: <strong>{data.yob}</strong>
          </div>
          <div className="mb-20">
            Giới tính: <strong>{data.gender}</strong>
          </div>
          <div className="mb-20">
            {data.koiImages.length > 0 && (
              <div className="mb-20">
                <h2>Hình ảnh</h2>
                <Image.PreviewGroup>
                  {data.koiImages.map((image, index) => (
                    <Image
                      key={index}
                      src={`https://koidayne.azurewebsites.net/uploads/koi/${image.urlImage}`}
                      alt={`Koi fish ${index + 1}`}
                      width={200}
                      className="mr-10 mb-10"
                    />
                  ))}
                </Image.PreviewGroup>
              </div>
            )}
          </div>
          <div className="mb-20">
            <p>Mô tả:</p>
            <strong>{data.description}</strong>
          </div>
        </>
      )}
    </>
  );
}
export default KoiDetail;
