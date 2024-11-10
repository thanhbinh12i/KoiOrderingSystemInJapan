import { Button, Divider, Form, Input, Modal, Radio, Typography } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { put } from "../../utils/request";
import { useState } from "react";
import Swal from "sweetalert2";
const { Title } = Typography;
function RefuseOrder(props) {
      const { record, isModalVisible, handleOk, handleCancel } = props;
      const [loading, setLoading] = useState(false);
      const [form] = Form.useForm();
      const handleRefund = async (values) => {
            setLoading(true);
            const data = {
                  "deliveryAddress": record.deliveryAddress,
                  "deliveryStatusText": "Từ chối nhận hàng do " + values.reason,
                  "estimatedDate": record.estimatedDate
            }
            const response = await put(`delivery-status/update/${record.deliveryStatusId}`, data);
            if (response) {
                  Swal.fire({
                        title: "Từ chối nhận hàng",
                        text: "Chúng tôi rất tiếc vì quý khách đã gặp phải sự cố. Theo chính sách, chúng tôi sẽ tiến hành hoàn lại số tiền cọc đã thanh toán. Xin lỗi quý khách về sự bất tiện này.",
                        icon: "info",
                        confirmButtonText: "Đồng ý"
                  });
                  handleOk();
                  setLoading(false);
            }
      }
      return (
            <>
                  <Modal
                        title={
                              <div>
                                    <ExclamationCircleOutlined style={{ color: '#faad14' }} className="mr-10" />
                                    <span>Xác nhận từ chối nhận cá</span>
                              </div>
                        }
                        visible={isModalVisible}
                        onCancel={handleCancel}
                        footer={null}
                        maskClosable={false}
                        width={600}
                  >
                        <Form
                              form={form}
                              layout="vertical"
                              onFinish={handleRefund}
                        >
                              <Title level={5}>Thông tin giao hàng</Title>
                              <Form.Item label="Địa chỉ giao hàng">
                                    <Input value={record.deliveryAddress} disabled />
                              </Form.Item>

                              <Form.Item label="Ngày giao dự kiến">
                                    <Input value={record.estimatedDate} disabled />
                              </Form.Item>

                              <Divider />
                              <Title level={5}>Lý do từ chối</Title>

                              <Form.Item name="reason" rules={[{ required: true, message: 'Vui lòng chọn lý do từ chối' }]}>
                                    <Radio.Group>
                                          <Radio value="Chất lượng cá kém">Chất lượng cá kém</Radio>
                                          <Radio value="Không đúng cá đã đặt">Không đúng cá đã đặt</Radio>
                                          <Radio value="Cá bị tổn thương">Cá bị tổn thương trong quá trình vận chuyển</Radio>
                                    </Radio.Group>
                              </Form.Item>

                              <Form.Item className="text-right">
                                    <Button type="default" onClick={handleCancel} style={{ marginRight: 8 }}>
                                          Hủy
                                    </Button>
                                    <Button type="primary" danger htmlType="submit" loading={loading}>
                                          Xác nhận từ chối
                                    </Button>
                              </Form.Item>
                        </Form>
                  </Modal>
            </>
      )
}
export default RefuseOrder;