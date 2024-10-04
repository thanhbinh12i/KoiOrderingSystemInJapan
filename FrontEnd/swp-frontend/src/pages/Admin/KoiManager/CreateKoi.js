import { Button, Col, Form, Input, message, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { get, post } from "../../../utils/request";
const { TextArea } = Input;
const { Option } = Select;

function CreateKoi() {
      const [form] = Form.useForm();
      const [varieties, setVarieties] = useState([]);
      const [farm, setFarm] = useState([]);
      const [loading, setLoading] = useState(false);
      const [messageApi, contextHolder] = message.useMessage();
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
            try {
                  setLoading(true);
                  const farmId = values.farmId;
                  const varietyId = values.varietyId;
                  const response = await post(`koi/create/${farmId}-${varietyId}`, values);
                  if (response) {
                        form.resetFields();
                        messageApi.success('Thêm cá koi mới thành công');
                  } else {
                        messageApi.error('Thêm cá mới không thành công');
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
                  <h1>Thêm cá koi mới</h1>
                  <Form onFinish={handleFinish} layout="vertical" form={form}>
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
                                          <Select options={varieties} />
                                    </Form.Item>
                              </Col>
                              <Col span={24}>
                                    <Form.Item label="Mô tả" name="description">
                                          <TextArea rows={16} />
                                    </Form.Item>
                              </Col>
                              <Col span={24}>
                                    <Form.Item>
                                          <Button type="primary" htmlType="submit" loading={loading}>
                                                Tạo mới
                                          </Button>
                                    </Form.Item>
                              </Col>
                        </Row>
                  </Form>
            </>
      )
}
export default CreateKoi;