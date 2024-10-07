import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../../../utils/request";
import GoBack from "../../../components/GoBack";
import { Image } from "antd";

function KoiDetail() {
      const params = useParams();
      const [data, setData] = useState();
      const [images, setImages] = useState([]);
      const [loading, setLoading] = useState(true);
      useEffect(() => {
            const fetchApi = async () => {
                  const response = await get(`koi/view-by-id/${params.id}`);
                  if (response) {
                        setData(response);
                  }
            }
            const fetchKoiImages = async () => {
                  const response = await get(`koi-image/view-by-koi-id/${params.id}`);
                  if (response) {
                        setImages(response);
                  }
            }
            const fetchData = async () => {
                  setLoading(true);
                  await Promise.all([fetchApi(), fetchKoiImages()]);
                  setLoading(false);
            }

            fetchData();
      }, [params.id])
      console.log(images);
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
                                    {images.length > 0 && (
                                          <div className="mb-20">
                                                <h2>Hình ảnh</h2>
                                                <Image.PreviewGroup>
                                                      {images.map((image, index) => (
                                                            <Image
                                                                  key={image.id || index}
                                                                  src={`https://localhost:7087/uploads/koi/${image.url}`}
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
      )
}
export default KoiDetail;