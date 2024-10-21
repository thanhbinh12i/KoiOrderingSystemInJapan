import { useEffect, useState } from "react";
import { get, put } from "../../../utils/request";
import { Button, Card, Col, List, Row, Steps } from "antd";
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';

function DeliveryDate() {
      const [deliveryList, setDeliveryList] = useState([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            const fetchApi = async () => {
                  try {
                        setLoading(true);
                        const response = await get("delivery-status/view-all");
                        if (response) {
                              setDeliveryList(response);
                        }
                  } catch (error) {
                        console.error('Không thể tải danh sách giao hàng');
                  } finally {
                        setLoading(false);
                  }
            }
            fetchApi();
      }, [])
      const handleUpdate = async (item, title) => {
            const data = {
                  "deliveryAddress": item.deliveryAddress,
                  "deliveryStatusText": title,
                  "estimatedDate": item.estimatedDate
            }
            console.log(data);
            const response = await put(`delivery-status/update/${item.deliveryStatusId}`, data);
            if (response) {
                  setDeliveryList(prevList =>
                        prevList.map(item =>
                              item.billId === item.billId
                                    ? { ...item, deliveryStatusText: title }
                                    : item
                        )
                  );
            }
      };
      const steps = [
            {
                  title: 'Đang chờ vận chuyển',
                  icon: <UserOutlined />,
            },
            {
                  title: 'Đã nhận hàng',
                  icon: <SolutionOutlined />,
            },
            {
                  title: 'Đang vận chuyển',
                  icon: <LoadingOutlined />,
            },
            {
                  title: 'Đang chờ thanh toán',
                  icon: <LoadingOutlined />,
            },
            {
                  title: 'Giao hàng thành công',
                  icon: <SmileOutlined />,
            },
      ];
      const getStepStatus = (item, stepIndex) => {
            const currentStepIndex = steps.findIndex(step => step.title === item.deliveryStatusText);
            if (stepIndex === currentStepIndex) return 'process';
            if (stepIndex < currentStepIndex) return 'finish';
            return 'wait';
      };
      return (
            <>
                  <Card>
                        <List
                              loading={loading}
                              dataSource={deliveryList}
                              renderItem={(item) => (
                                    <List.Item>
                                          <Row gutter={20}>
                                                <Col span={24}>
                                                      <p>Đơn hàng số <strong>{item.billId}</strong></p>
                                                      <p>Địa chỉ: <strong>{item.deliveryAddress}</strong></p>
                                                      <p>Ngày giao hàng: <strong>{item.estimatedDate}</strong></p>
                                                      <p>Trạng thái: <strong>{item.deliveryStatusText}</strong></p>
                                                </Col>
                                                <Col span={24}>
                                                      <Steps
                                                            items={steps.map((step, index) => ({
                                                                  ...step,
                                                                  status: getStepStatus(item, index),
                                                                  description: (
                                                                        <Button
                                                                              type="primary"
                                                                              onClick={() => handleUpdate(item, step.title)}
                                                                              disabled={step.title === item.deliveryStatusText ||
                                                                                    index < steps.findIndex(s => s.title === item.deliveryStatusText)}
                                                                        >
                                                                              Cập nhật
                                                                        </Button>
                                                                  )
                                                            }))}
                                                      />
                                                </Col>
                                          </Row>
                                    </List.Item>
                              )}
                        />
                  </Card>
            </>
      )
}
export default DeliveryDate;