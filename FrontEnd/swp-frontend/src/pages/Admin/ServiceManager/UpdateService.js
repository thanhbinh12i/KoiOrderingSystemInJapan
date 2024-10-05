import { Button, Form, Input, message, Modal, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons"
import { useState } from "react";
import { put } from "../../../utils/request";
const { TextArea } = Input;
function UpdateService(props) {
      const { record, handleReload } = props;
      const [form] = Form.useForm();
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [mess, contextHolder] = message.useMessage();
      const showModal = () => {
            setIsModalOpen(true);
      }
      const closeModal = () => {
            setIsModalOpen(false);
      }
      const handleFinish = async (values) => {
            const response = await put(`service/update/${record.serviceId}`, values);
            if (response) {
                  setIsModalOpen(false);
                  handleReload();
                  mess.open({
                        type: "success",
                        content: "Cập nhật thành công!",
                        duration: 5
                  })
            } else {
                  mess.open({
                        type: "error",
                        content: "Cập nhật không thành công!",
                        duration: 3
                  })
            }
      }
      return (
            <>
            {contextHolder}
                  <Tooltip title="Chỉnh sửa">
                        <Button onClick={showModal} icon={<EditOutlined />} type="primary"></Button>
                        <Modal open={isModalOpen} onCancel={closeModal} title="Chỉnh sửa dịch vụ" footer={null}>
                              <Form onFinish={handleFinish} layout="vertical" form={form} initialValues={record}>
                                    <Form.Item
                                          label="Tên dịch vụ"
                                          name="serviceName"
                                          rules={[{ required: true, message: 'Vui lòng nhập tên dịch vụ!' }]}
                                    >
                                          <Input placeholder="Nhập tên giống cá" />
                                    </Form.Item>
                                    <Form.Item
                                          label="Giá tiền"
                                          name="price"
                                          rules={[{ required: true, message: 'Vui lòng nhập giá tiền!' }]}
                                    >
                                          <Input placeholder="Nhập màu sắc" />
                                    </Form.Item>
                                    <Form.Item
                                          label="Mô tả"
                                          name="description"
                                          rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                                    >
                                          <TextArea placeholder="Nhập mô tả" />
                                    </Form.Item>
                                    <Form.Item>
                                          <Button type="primary" htmlType="submit" >
                                                Cập nhật
                                          </Button>
                                    </Form.Item>
                              </Form>
                        </Modal>
                  </Tooltip>
            </>
      )
}
export default UpdateService;