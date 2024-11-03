import { Button, Form, Modal, Typography } from "antd";
import { put } from "../../utils/request";
const { Text, Paragraph } = Typography;

function CancelOrder(props){
      const { record, isModalVisible, handleOk, handleCancel } = props;
      const [form] = Form.useForm();
      const handleFinish = async () => {
            const data = {
                  "deliveryAddress": record.deliveryAddress,
                  "deliveryStatusText": "Yêu cầu hủy đơn",
                  "estimatedDate": record.estimatedDate
            }
            const response = await put(`delivery-status/update/${record.deliveryStatusId}`, data);
            if(response){
                  handleOk();
            }
      }
      return (
            <>
             <Modal
                        open={isModalVisible}
                        onCancel={handleCancel}
                        title="Hủy đơn đặt cá Koi"
                        footer={null}
                  >
                        <Form
                              onFinish={handleFinish}
                              layout="vertical"
                              form={form}
                              initialValues={record}
                        >
                              <Paragraph>
                                    Quý khách đang yêu cầu hủy đơn hàng sau:
                              </Paragraph>
                              <Paragraph>
                                    <Text strong>Mã đơn:</Text> {record.billId}<br />
                                    <Text strong>Địa chỉ:</Text> {record.deliveryAddress}<br />
                              </Paragraph>
                              <Paragraph type="warning">
                                    Lưu ý: Theo chính sách của chúng tôi, quý khách sẽ mất hết tiền cọc nếu hủy đơn hàng này.
                              </Paragraph>
                              <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                          Gửi yêu cầu hủy
                                    </Button>
                              </Form.Item>
                        </Form>
                  </Modal>
            </>
      )
}
export default CancelOrder;