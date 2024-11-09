import { useParams } from "react-router-dom";
import GoBack from "../../components/GoBack";
import { useEffect, useState } from "react";
import { Card, Typography, Divider, Space, Table } from 'antd';
import { get } from "../../utils/request";
import "./MyOrderDetail.scss"
const { Title } = Typography;

function MyOrderDetail() {
      const params = useParams();
      const [koiBill, setKoiBill] = useState([]);
      const [totalPrice, setTotalPrice] = useState(0);
      useEffect(() => {
            const fetchApi = async () => {
                  const response = await get(`koi-bill/view-by-billId/${params.id}`);
                  if (response) {
                        setKoiBill(response);
                  }
            }
            fetchApi();
      }, [params.id])
      useEffect(() => {
            const itemsTotal = koiBill.reduce((sum, item) => sum + item.finalPrice * item.quantity, 0);
            setTotalPrice(itemsTotal);
      }, [koiBill]);
      const columns = [
            {
                  title: 'Tên Cá Koi',
                  dataIndex: 'koiName',
                  key: 'koiName',
            },
            {
                  title: 'Số lượng',
                  dataIndex: 'quantity',
                  key: 'quantity',
            },
            {
                  title: 'Đơn giá',
                  dataIndex: 'finalPrice',
                  key: 'finalPrice',
                  render: (price) => `${price.toLocaleString()}đ`
            },
            {
                  title: 'Tổng',
                  key: 'total',
                  render: (record) => `${(record.quantity * record.finalPrice).toLocaleString()}đ`
            }
      ];

      return (
            <>
                  <div className="bill-container" >
                        <div className="bill-wrapper">
                              <GoBack />

                              <Card className="bill-content">
                                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                                          <div className="bill-header">
                                                <Title level={2}>KOI DAY NE WEBSITE</Title>
                                                <Title level={4}>Đơn hàng #{params.id}</Title>
                                          </div>

                                          <Divider />

                                          <Table
                                                columns={columns}
                                                dataSource={koiBill}
                                                pagination={false}
                                          />

                                          <Divider />

                                          <div className="bill-footer">
                                                <Title level={3}>
                                                      Tổng tiền: {totalPrice?.toLocaleString()}đ
                                                </Title>
                                          </div>
                                    </Space>
                              </Card>
                        </div>
                  </div>
            </>
      )
}
export default MyOrderDetail;