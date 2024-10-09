import { Modal, Form, Input, Button, message } from 'antd';
import { useState } from 'react';
import { post } from '../../../utils/request';

const { TextArea } = Input;
function CreateVariety({ isModalVisible, handleOk, handleCancel }) {
      const [form] = Form.useForm();
      const [loading, setLoading] = useState(false);
      const [messageApi, contextHolder] = message.useMessage();
      const handleSubmit = async (values) => {
            try {
                  setLoading(true);
                  const response = await post('koi-variable/create', values);
                  if (response) {
                        form.resetFields();
                        handleOk();
                        messageApi.success('Thêm giống mới thành công');
                  } else {
                        messageApi.error('Thêm giống mới không thành công');
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
                        title="Thêm giống cá mới"
                        visible={isModalVisible}
                        onCancel={handleCancel}
                        footer={null}
                  >
                        <Form form={form} layout="vertical" onFinish={handleSubmit}>
                              <Form.Item
                                    label="Tên giống cá"
                                    name="varietyName"
                                    rules={[{ required: true, message: 'Vui lòng nhập tên giống cá!' }]}
                              >
                                    <Input placeholder="Nhập tên giống cá" />
                              </Form.Item>
                              <Form.Item
                                    label="Mô tả"
                                    name="description"
                                    rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                              >
                                    <TextArea placeholder="Nhập mô tả" />
                              </Form.Item>
                              <Form.Item
                                    label="Ảnh"
                                    name="urlImage"
                                    rules={[{ required: true, message: 'Vui lòng nhập ảnh!' }]}
                              >
                                    <Input placeholder="Nhập ảnh" />
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
export default CreateVariety;