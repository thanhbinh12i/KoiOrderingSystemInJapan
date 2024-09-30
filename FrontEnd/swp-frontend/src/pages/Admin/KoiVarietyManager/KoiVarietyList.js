import {Table} from "antd"
import { useEffect, useState } from "react";
import { get } from "../../../utils/request";
import DeleteVariety from "./DeleteVariety";

function KoiVarietyList() {
      const [varieties, setVarieties] = useState([]);
      const fetchApi = async () => {
            const response = await get("koi-variable/view-all");
            if(response){
                  setVarieties(response);
            }
      }

      useEffect(() => {
            fetchApi();
      }, [])
      const handleReload = () => {
            fetchApi();
      }
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
            },
            {
                  title: "Hành động",
                  key: "actions",
                  render: (_, record) => (
                        <>
                              <DeleteVariety record={record} handleReload={handleReload}/>
                        </>
                  )
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