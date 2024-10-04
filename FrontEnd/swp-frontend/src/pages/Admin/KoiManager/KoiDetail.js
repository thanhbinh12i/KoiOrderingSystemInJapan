import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../../../utils/request";

function KoiDetail() {
      const params = useParams();
      const [data, setData] = useState();
      useEffect(() => {
            const fetchApi = async () => {
                  const response = await get(`koi/view-by-id/${params.id}`);
                  if (response) {
                        setData(response);
                  }
            }
            fetchApi();

      }, [])
      return (
            <>
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
                                    <p>Mô tả:</p>
                                    <strong>{data.description}</strong>
                              </div>
                        </>
                  )}
            </>
      )
}
export default KoiDetail;