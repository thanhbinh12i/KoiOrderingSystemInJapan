import { useEffect, useState } from "react";
import { get } from "../../utils/request";

function MyBill(){
      const userId = localStorage.getItem("id");
      const [bill, setBill] = useState([]);
      useEffect(() => {
            const fetchApi = async () => {
                  const response = await get(`bill/view-by-user-id/${userId}`);
                  if (response) {
                        setBill(response);
                  }
            }
            fetchApi();
      }, [userId])
      return (
            <>

            </>
      )
}
export default MyBill;