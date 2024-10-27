import { useParams } from "react-router-dom";
import GoBack from "../../components/GoBack";
import { useEffect, useState } from "react";
import { Card, Typography, List } from 'antd';
import { get } from "../../utils/request";

const { Title, Text } = Typography;

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
      return (
            <>
                  <GoBack />

                  <Title level={3} style={{paddingLeft: '30px'}}>Chi tiết đơn hàng số {params.id}</Title>
                  <Card>
                        <List
                              dataSource={koiBill}
                              renderItem={(item) => (
                                    <List.Item>
                                          <Text strong>{item.koiName}</Text>
                                          <Text>Số lượng: <strong>{item.quantity}</strong></Text>
                                          <Text>Giá tiền chốt: <strong>{item.finalPrice.toLocaleString()} đ</strong></Text>
                                    </List.Item>
                              )}
                        />
                  </Card>
                  <Title level={4} style={{ marginTop: '20px', textAlign: 'right', paddingRight: '30px' }}>
                        Tổng tiền: {totalPrice?.toLocaleString()} đ
                  </Title>
            </>
      )
}
export default MyOrderDetail;