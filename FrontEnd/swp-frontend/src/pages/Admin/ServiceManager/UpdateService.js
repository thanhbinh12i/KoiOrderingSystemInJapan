import { Button, Form, Input, message, Modal, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
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
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleFinish = async (values) => {
    const response = await put(`delivery/update/${record.deliveryId}`, values);
    if (response) {
      console.log(response);
      setIsModalOpen(false);
      handleReload();
      mess.open({
        type: "success",
        content: "Cập nhật thành công!",
        duration: 5,
      });
    } else {
      mess.open({
        type: "error",
        content: "Cập nhật không thành công!",
        duration: 3,
      });
    }
  };
  return (
    <>
      {contextHolder}
      <Tooltip title="Chỉnh sửa">
        <Button
          onClick={showModal}
          icon={<EditOutlined />}
          type="primary"
        ></Button>
        <Modal
          open={isModalOpen}
          onCancel={closeModal}
          title="Chỉnh sửa dịch vụ"
          footer={null}
        >
          <Form
            onFinish={handleFinish}
            layout="vertical"
            form={form}
            initialValues={record}
          >
            <Form.Item
              label="Tên dịch vụ vận chuyển"
              name="deliveryType"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên dịch vụ vận chuyển!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phí vận chuyển"
              name="deliveryFee"
              rules={[
                { required: true, message: "Vui lòng nhập phí vận chuyển!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Mô tả"
              name="deliveryDescription"
              rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
            >
              <TextArea />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Tooltip>
    </>
  );
}
export default UpdateService;
