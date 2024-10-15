import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { get } from "../../utils/request";

function OrderKoi() {
      const location = useLocation();
      const params = useParams();
      const { tourId } = location.state;
      const [koi, setKoi] = useState([]);
      useEffect(() => {
            const fetchApi = async () => {
                  const response = await get(`tourDestination/view-tourId/${tourId}`);
                  if (response) {
                        const farmIdList = response.map(dest => dest.farmId);
                        const koiPromises = farmIdList.map(async (farmId) => {
                              const koiResponse = await get(`koi/view-by-farmId/${farmId}`);
                              return koiResponse; 
                        });

                        const koiData = await Promise.all(koiPromises);
                        setKoi(koiData);
                  }
            }
            fetchApi();
      }, [])
      //chỗ cbi add vào koi bill nè
      //Làm thêm nút để liên hệ với staff cá koi cần deal giá
      //Thực hiện deal giá, update giá bên staff
      //Làm lại layout staff
      //Làm thêm bảng cart 
      //
      return (
            <>
                  <div>Các cá koi của các trang trại trong tour</div>
            </>
      )
}
export default OrderKoi;