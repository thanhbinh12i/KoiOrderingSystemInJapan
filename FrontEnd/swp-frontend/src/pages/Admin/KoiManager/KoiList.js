import { Table } from "antd";
import EditKoi from "./EditKoi";
import DeleteKoi from "./DeleteKoi";
import { useEffect, useState } from "react";
import { get } from "../../../utils/request";

function KoiList() {
      const [koi, setKoi] = useState([]);
      const fetchApi = async () => {
            const response = await get("koi/view-all");
            if (response) {
                  setKoi(response);
            }
      }
      useEffect(() => {
            fetchApi();
      },[])
      const handleReload = () => {
            fetchApi();
      }
      const column = [
            {
                  title: "Tên cá koi",
                  dataIndex: "koiName",
                  key: "koiName",
            },
            {
                  title: "Giá tiền",
                  dataIndex: "price",
                  key: "price",
            },
            {
                  title: "Độ dài",
                  dataIndex: "length",
                  key: "length",
            },
            {
                  title: "Năm sinh",
                  dataIndex: "yob",
                  key: "yob",
            },
            {
                  title: "Giới tính",
                  dataIndex: "gender",
                  key: "gender",
            },
            {
                  title: "Mô tả",
                  dataIndex: "description",
                  key: "description",
            },
            {
                  title: "Hành động",
                  key: "actions",
                  render: (_, record) => (
                        <>
                              <EditKoi record={record} handleReload={handleReload}/>
                              <DeleteKoi record={record} handleReload={handleReload}/>
                        </>
                  )
            }
      ]
      return (
            <>
                  <div className="koi__table">
                        <Table columns={column} dataSource={koi} rowKey="koiId" bordered />
                  </div>
            </>
      )
}
export default KoiList;