import { Card, Row, Col, Button, message } from 'antd';
import GoBack from '../GoBack';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { post } from '../../utils/request';
import { useState } from 'react';

function BookTour() {
      const location = useLocation();
      const { tourName, startTime, finishTime, numberOfParticipate, price } = location.state || {};
      const [messageApi, contextHolder] = message.useMessage();
      const params = useParams();
      const userId = localStorage.getItem("id");
      const [loading, setLoading] = useState(false);
      const navigate = useNavigate();
      const onFinish = async () => {
            const getTimeCurrent = () => {
                  return new Date().toISOString();
            };
            const quotationData = {
                  "priceOffer": price,
                  "status": "pending",
                  "approvedDate": getTimeCurrent(),
            };
            setLoading(true);
            const response = await post(`quotation/create/${userId}&${params.id}`, quotationData);
            if (!response) {
                  messageApi.success(`Đặt tour thành công!`);
                  setLoading(false);
                  navigate("/book-success");
            } 
      }
      return (
            <>
                  {contextHolder}
                  <GoBack />
                  <Row gutter={16} style={{ marginTop: 20 }}>
                        <Col span={18}>
                              <Card title="Thông tin tour" style={{ maxWidth: 800, margin: 'auto' }}>
                                    <p><strong>Tên tour:</strong> {tourName}</p>
                                    <p><strong>Khởi hành:</strong> {startTime}</p>
                                    <p><strong>Kết thúc:</strong> {finishTime}</p>
                                    <p><strong>Số người tham gia:</strong> {numberOfParticipate}</p>
                                    <p><strong>Giá tour:</strong> {price}đ</p>
                                    <Button type="primary" onClick={onFinish} loading={loading}>
                                          Xác nhận đặt tour
                                    </Button>
                              </Card>

                        </Col>
                  </Row>
            </>
      )
}
export default BookTour;