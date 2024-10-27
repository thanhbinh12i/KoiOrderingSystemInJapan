import { useEffect, useState } from "react";
import { get } from "../../../utils/request";
import { Button, Table } from "antd";
import { Link } from "react-router-dom";

function KoiDeal() {
      const [bill, setBill] = useState([]);
      const [quotations, setQuotations] = useState({});
      const [tours, setTours] = useState({});

      useEffect(() => {
            const fetchApi = async () => {
                  const billResponse = await get("bill/view-all");
                  if (billResponse) {
                        setBill(billResponse);

                        const quotationData = {};
                        for (let item of billResponse) {
                              const quotationResponse = await get(`quotation/view/${item.quotationId}`);
                              if (quotationResponse) {
                                    quotationData[item.quotationId] = quotationResponse;

                                    const tourResponse = await get(`tour/view-tourId/${quotationResponse.tourId}`);
                                    if (tourResponse) {
                                          setTours(prev => ({
                                                ...prev,
                                                [quotationResponse.tourId]: tourResponse
                                          }));
                                    }
                              }
                        }
                        setQuotations(quotationData);
                  }
            }
            fetchApi();
      }, [])
      const columns = [
            {
                  title: 'Id',
                  dataIndex: 'billId',
                  key: 'billId',
            },
            {
                  title: 'Họ và tên',
                  dataIndex: 'userFullName',
                  key: 'userFullName',
            },
            {
                  title: 'Tên tour',
                  key: 'tourName',
                  render: (record) => {
                        const quotation = quotations[record.quotationId];
                        const tour = quotation ? tours[quotation.tourId] : null;
                        return tour ? tour.tourName : 'N/A';
                  }
            },
            {
                  title: 'Ngày khởi hành',
                  key: 'startDate',
                  render: (record) => {
                        const quotation = quotations[record.quotationId];
                        const tour = quotation ? tours[quotation.tourId] : null;
                        return tour ? tour.startTime : 'N/A';
                  }
            },
            {
                  title: 'Hành động',
                  key: 'action',
                  render: (_, record) => (
                        <>
                              <Link to={`${record.billId}`}>
                                    <Button>Xem chi tiết</Button>
                              </Link>
                        </>

                  )
            },
      ];
      return (
            <>
                  <div>
                        <h1>Danh sách các giao dịch</h1>
                        <Table dataSource={bill} columns={columns} bordered />
                  </div>
            </>
      )
}
export default KoiDeal;