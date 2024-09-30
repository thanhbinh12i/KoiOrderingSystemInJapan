import { Modal, Form, Input, Button, message } from 'antd';
import { useState } from 'react';
import { post } from '../../../utils/request';
function CreateVariety({ isModalVisible, handleOk, handleCancel }) {
      const [form] = Form.useForm();
      const [loading, setLoading] = useState(false);
      const [messageApi, contextHolder] = message.useMessage();
      const handleSubmit = async (values) => {
            try {
                  setLoading(true); 
                  const respone = await post('koi-variable/create', values);
                  if (respone) {
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
                                    name="VarietyName"
                                    rules={[{ required: true, message: 'Vui lòng nhập tên giống cá!' }]}
                              >
                                    <Input placeholder="Nhập tên giống cá" />
                              </Form.Item>
                              <Form.Item
                                    label="Màu sắc"
                                    name="Color"
                                    rules={[{ required: true, message: 'Vui lòng nhập màu sắc!' }]}
                              >
                                    <Input placeholder="Nhập màu sắc" />
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