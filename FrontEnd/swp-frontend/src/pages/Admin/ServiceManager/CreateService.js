import { Button, Form, Input, message, Modal } from "antd";
import { useState } from "react";
import { post } from "../../../utils/request";
const {TextArea} = Input;

function CreateService(props) {
      const {isModalVisible, handleCancel, handleReload} = props;
      const [form] = Form.useForm();
      const [loading, setLoading] = useState(false);
      const [messageApi, contextHolder] = message.useMessage();
      const handleSubmit = async (values) => {
            try {
                  setLoading(true);
                  const response = await post('service/create', values);
                  if (response) {
                        form.resetFields();
                        handleCancel();
                        handleReload();
                        messageApi.success('Thêm dịch vụ thành công');
                  } else {
                        messageApi.error('Thêm dịch vụ không thành công');
                  }
            } catch (error) {
                  messageApi.error('Lỗi');
            } finally {
                  setLoading(false);
            }
      }
      return (
            <>
                  {contextHolder}
                  <Modal
                        title="Thêm dịch vụ mới"
                        visible={isModalVisible}
                        onCancel={handleCancel}
                        footer={null}
                  >
                        <Form form={form} layout="vertical" onFinish={handleSubmit}>
                              <Form.Item
                                    label="Tên dịch vụ"
                                    name="serviceName"
                                    rules={[{ required: true, message: 'Vui lòng nhập tên dịch vụ!' }]}
                              >
                                    <Input placeholder="Nhập tên dịch vụ" />
                              </Form.Item>
                              <Form.Item
                                    label="Giá tiền"
                                    name="price"
                                    rules={[{ required: true, message: 'Vui lòng nhập giá tiền!' }]}
                              >
                                    <Input placeholder="Nhập giá tiền" />
                              </Form.Item>
                              <Form.Item
                                    label="Mô tả"
                                    name="detail"
                                    rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                              >
                                    <TextArea placeholder="Nhập mô tả" />
                              </Form.Item>
                              <Form.Item>
                                    <Button type="primary" htmlType="submit" loading={loading}>
                                          Thêm
                                    </Button>
                              </Form.Item>
                        </Form>
                  </Modal>
            </>
      )
}
export default CreateService;