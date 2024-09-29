import {Table} from "antd"
import { useEffect, useState } from "react";
import { viewAllVariety } from "../../../services/koiVarietyServices";

function KoiVarietyList() {
      const [varieties, setVarieties] = useState([]);
      const fetchApi = async () => {
            const response = await viewAllVariety();
            console.log(response);
            if(response){
                  setVarieties(response);
            }
      }
      useEffect(() => {
            fetchApi();
      }, [])
      const column = [
            {
                  title: "Tên giống cá",
                  dataIndex: "varietyName",
                  key: "varietyName",
            },
            {
                  title: "Màu sắc",
                  dataIndex: "color",
                  key: "color",
            }
            
      ]
      return (
            <>
                  <div className="">
                        <Table columns={column} dataSource={varieties} rowKey="VarietyId" />
                  </div>
            </>
      )
}
export default KoiVarietyList;