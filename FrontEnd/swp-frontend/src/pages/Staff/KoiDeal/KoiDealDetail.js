import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../../../utils/request";

function KoiDealDetail() {
      const params = useParams();
      const [koiBill, setKoiBill] = useState([]);
      useEffect(() => {
            const fetchApi = async () => {
                  const response = await get(`koi-bill/view-by-billId/${params.id}`);
                  if(response){
                        setKoiBill(response);
                  }
            }
            fetchApi();
      },[])
      return (
            <>
            
            </>
      )
}
export default KoiDealDetail;