import { Button, Col, Form, Input, message, Modal, Row, Select, Tooltip } from "antd";
import { get, put } from "../../../utils/request";
import { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons"
const { TextArea } = Input;
const { Option } = Select;

function EditKoi(props) {
      const { record, handleReload } = props;
      const [form] = Form.useForm();
      const [varieties, setVarieties] = useState([]);
      const [farm, setFarm] = useState([]);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [mess, contextHolder] = message.useMessage();
      const showModal = () => {
            setIsModalOpen(true);
      }
      const closeModal = () => {
            setIsModalOpen(false);
      }
      useEffect(() => {
            const fetchApi = async () => {
                  const response = await get("koi-variable/view-all");
                  if (response) {
                        const formattedVarieties = response.map(item => ({
                              label: item.varietyName + " ( " + (item.color) + " ) ",
                              value: item.varietyId
                        }));
                        setVarieties(formattedVarieties);
                  }
            }
            fetchApi();
      }, [])
      useEffect(() => {
            const fetchApi = async () => {
                  const response = await get("koiFarm/view-all");
                  if (response) {
                        const formattedFarm = response.map(item => ({
                              label: item.farmName,
                              value: item.farmId
                        }));
                        setFarm(formattedFarm);
                  }
            }
            fetchApi();
      }, [])
      const handleFinish = async (values) => {
            const response = await put(`koi/update/${record.koiId}`, values);
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
                        <Button onClick={showModal} className="ml-5" icon={<EditOutlined />} type="primary"></Button>
                        <Modal open={isModalOpen} onCancel={closeModal} title="Chỉnh sửa cá koi" footer={null}>
                              <Form onFinish={handleFinish} layout="vertical" form={form} initialValues={record}>
                                    <Row gutter={20}>
                                          <Col span={24}>
                                                <Form.Item label="Tên cá koi" name="koiName" rules={[{ required: true, message: 'Vui lòng nhập tên cá koi!' }]}>
                                                      <Input />
                                                </Form.Item>
                                          </Col>
                                          <Col span={8}>
                                                <Form.Item label="Độ dài" name="length" rules={[{ required: true, message: 'Vui lòng nhập độ dài!' }]}>
                                                      <Input />
                                                </Form.Item>
                                          </Col>
                                          <Col span={8}>
                                                <Form.Item label="Giá" name="price" rules={[{ required: true, message: 'Vui lòng nhập giá tiền!' }]}>
                                                      <Input addonAfter="đ" />
                                                </Form.Item>
                                          </Col>
                                          <Col span={8}>
                                                <Form.Item label="Năm" name="yob" rules={[{ required: true, message: 'Vui lòng nhập năm sinh!' }]}>
                                                      <Input />
                                                </Form.Item>
                                          </Col>
                                          <Col span={8}>
                                                <Form.Item label="Giới tính" name="gender" rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}>
                                                      <Select>
                                                            <Option value="Koi Đực">Đực</Option>
                                                            <Option value="Koi Cái">Cái</Option>
                                                      </Select>
                                                </Form.Item>
                                          </Col>
                                          <Col span={8}>
                                                <Form.Item label="Trang trại" name="farmId" rules={[{ required: true, message: 'Vui lòng chọn trang trại!' }]}>
                                                      <Select options={farm} />
                                                </Form.Item>
                                          </Col>
                                          <Col span={8}>
                                                <Form.Item label="Giống cá" name="varietyId" rules={[{ required: true, message: 'Vui lòng chọn giống cá!' }]}>
                                                      <Select mode="multiple" options={varieties} />
                                                </Form.Item>
                                          </Col>
                                          <Col span={24}>
                                                <Form.Item label="Mô tả" name="description">
                                                      <TextArea rows={16} />
                                                </Form.Item>
                                          </Col>
                                          <Col span={24}>
                                                <Form.Item>
                                                      <Button type="primary" htmlType="submit">
                                                            Cập nhật
                                                      </Button>
                                                </Form.Item>
                                          </Col>
                                    </Row>
                              </Form>

                        </Modal>
                  </Tooltip>
            </>
      )
}
export default EditKoi;