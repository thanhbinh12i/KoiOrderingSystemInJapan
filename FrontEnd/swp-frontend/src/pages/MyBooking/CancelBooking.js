import { Button, Form, Modal, Typography, Input } from "antd";
import { put } from "../../utils/request";
const { TextArea } = Input;
const { Text, Paragraph } = Typography;

function CancelBooking(props) {
      const { record, isModalVisible, handleOk, handleCancel } = props;
      const [form] = Form.useForm();
      const handleFinish = async (values) => {
            const quotationData = {
                  "priceOffer": record.priceOffer,
                  "status": "Yêu cầu hủy đặt chỗ",
                  "approvedDate": record.approvedDate,
                  "description": values.description,

            };
            const response = await put(`quotation/update/${record.quotationId}`, quotationData);
            if (response) {
                  handleOk();
            }
      }
      return (
            <>
                  <Modal
                        open={isModalVisible}
                        onCancel={handleCancel}
                        title="Hủy đơn đặt chỗ"
                        footer={null}
                  >
                        <Form
                              onFinish={handleFinish}
                              layout="vertical"
                              form={form}
                              initialValues={record}
                        >
                              <Paragraph>
                                    Quý khách đang yêu cầu hủy đơn đặt chỗ sau:
                              </Paragraph>
                              <Paragraph>
                                    <Text strong>Mã đơn:</Text> {record.quotationId}<br />
                                    <Text strong>Dịch vụ:</Text> {record.tourId}<br />
                                    <Text strong>Ngày đặt:</Text> {record.approvedDate}<br />
                                    <Text strong>Tổng tiền:</Text> {record.priceOffer}
                              </Paragraph>
                              <Paragraph type="warning">
                                    Lưu ý: Theo chính sách của chúng tôi, quý khách sẽ được hoàn lại 50% số tiền đã thanh toán.
                              </Paragraph>

                              <Form.Item
                                    name="description"
                                    label="Lý do hủy đơn (không bắt buộc)"
                                    rules={[{ max: 500, message: 'Lý do không được vượt quá 500 ký tự' }]}
                              >
                                    <TextArea
                                          rows={4}
                                          placeholder="Vui lòng cho chúng tôi biết lý do bạn muốn hủy đơn"
                                    />
                              </Form.Item>
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
export default CancelBooking;