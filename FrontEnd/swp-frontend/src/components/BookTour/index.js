import { Card, Row, Col, Button, message, Form, Input } from 'antd';
import GoBack from '../GoBack';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { post } from '../../utils/request';
import { useState } from 'react';

const {TextArea} = Input;

function BookTour() {
      const location = useLocation();
      const { tourName, startTime, finishTime, numberOfParticipate, price } = location.state || {};
      const [messageApi, contextHolder] = message.useMessage();
      const params = useParams();
      const userId = localStorage.getItem("id");
      const [loading, setLoading] = useState(false);
      const navigate = useNavigate();
      const [form] = Form.useForm();
      const onFinish = async (values) => {
            const getTimeCurrent = () => {
                  return new Date().toLocaleString();
            };
            const quotationData = {
                  ...values,
                  "priceOffer": price,
                  "status": "Chờ xác nhận",
                  "approvedDate": getTimeCurrent(),
            };
            console.log(quotationData);
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
                  <Form layout="vertical" form={form} onFinish={onFinish}>
                        <Row gutter={20} style={{ marginTop: 20 , marginLeft: 30}}>
                              <Col span={8}>
                                    <Card title="Thông tin tour" style={{ maxWidth: 800, margin: 'auto' }}>
                                          <p><strong>Tên tour:</strong> {tourName}</p>
                                          <p><strong>Khởi hành:</strong> {startTime}</p>
                                          <p><strong>Kết thúc:</strong> {finishTime}</p>
                                          <p><strong>Số người tham gia:</strong> {numberOfParticipate}</p>
                                          <p><strong>Giá tour:</strong> {price}đ</p>

                                    </Card>

                              </Col>
                              <Col span={16}>
                                    <Card title="Thông tin của bạn" style={{ maxWidth: 800, margin: 'auto' }}>
                                          <Form.Item label="Họ và tên" name="fullName">
                                                <Input placeholder='Nhập họ và tên của bạn' />
                                          </Form.Item>
                                          <Form.Item label="Email" name="email">
                                                <Input placeholder='Nhập email' />
                                          </Form.Item>
                                          <Form.Item label="Số điện thoại" name="phoneNumber">
                                                <Input placeholder='Nhập số điện thoại' />
                                          </Form.Item>
                                          <Form.Item label="Lời nhắn" name="description" initialValue="">
                                                <TextArea placeholder='Lời nhắn (nếu có)' />
                                          </Form.Item>
                                          <Form.Item>
                                                <Button type="primary" htmlType='submit' loading={loading}>
                                                      Xác nhận đặt tour
                                                </Button>
                                          </Form.Item>
                                    </Card>
                              </Col>
                        </Row>
                  </Form>

            </>
      )
}
export default BookTour;