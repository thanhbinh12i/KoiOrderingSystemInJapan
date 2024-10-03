import { Button, Col, Form, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { get } from "../../../utils/request";
const { TextArea } = Input;
const { Option } = Select;

function CreateKoi() {
      const [form] = Form.useForm();
      const [varieties, setVarieties] = useState([]);
      const [farm, setFarm] = useState([]);
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
      const handleFinish = () => {

      }
      return (
            <>
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
                                    <Form.Item label="Giá" name="salary" rules={[{ required: true, message: 'Vui lòng nhập giá tiền!' }]}>
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
                                                <Option value="male">Đực</Option>
                                                <Option value="female">Cái</Option>
                                          </Select>
                                    </Form.Item>
                              </Col>
                              <Col span={8}>
                                    <Form.Item label="Trang trại" name="farmId" rules={[{ required: true, message: 'Vui lòng chọn trang trại!' }]}>
                                          <Select options={farm} />
                                    </Form.Item>
                              </Col>
                              <Col span={8}>
                                    <Form.Item label="Giống cá" name="varieties" rules={[{ required: true, message: 'Vui lòng chọn giống cá!' }]}>
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
                                          <Button type="primary" htmlType="submit">
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