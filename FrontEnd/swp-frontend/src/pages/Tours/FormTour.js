import { Button, Col, DatePicker, Form, Input, message, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { get, post } from "../../utils/request";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

function FormTour() {
      const [farms, setFarms] = useState([]);
      const [loading, setLoading] = useState(false);
      const [messageApi, contextHolder] = message.useMessage();
      const userId = localStorage.getItem("id");
      const navigate = useNavigate();
      useEffect(() => {
            const fetchApi = async () => {
                  const response = await get("koiFarm/view-all");
                  if (response) {
                        const formattedFarm = response.map(item => ({
                              label: item.farmName,
                              value: item.farmId
                        }));
                        setFarms(formattedFarm);
                  }
            }
            fetchApi();
      }, [])
      const onFinish = async (values) => {
            const tourName = "Tour ";
            try {
                  setLoading(true);
                  const { farmId } = values;
                  const formattedValues = {
                        ...values,
                        tourName: tourName,
                        startTime: values.startTime.format("YYYY-MM-DD"),
                        finishTime: values.finishTime.format("YYYY-MM-DD"),
                  };
                  const tourResponse = await post("tour/create", formattedValues);

                  if (tourResponse) {
                        const tourId = tourResponse.tourId;

                        if (Array.isArray(farmId) && farmId.length > 0) {
                              const farmPromises = farmId.map((farmId) =>
                                    post(`tourDestination/create/${farmId}&${tourId}`, {
                                          tourDestination: tourId,
                                          type: "custom",
                                    })
                              );
                              await Promise.all(farmPromises);
                        }

                        form.resetFields();
                  }
                  //Cho vào quotation nè
                  const getTimeCurrent = () => {
                        return new Date().toLocaleString();
                  };
                  const quotationData = {
                        "fullName": values.fullName,
                        "phoneNumber": values.phoneNumber,
                        "email": values.email,
                        "priceOffer": 0,
                        "status": "Chờ xác nhận",
                        "approvedDate": getTimeCurrent(),
                        "description": values.description
                  };
                  setLoading(true);
                  const response = await post(`quotation/create/${userId}&${tourResponse.tourId}`, quotationData);
                  if (!response) {
                        setLoading(false);
                        navigate("/book-success");
                  }
            } catch (error) {
                  console.log(error);
                  messageApi.error("Lỗi");
            } finally {
                  setLoading(false);
            }
      }
      const [form] = Form.useForm();
      return (
            <>
                  {contextHolder}
                  <h2>Bạn chưa tìm kiếm được chuyến đi mong muốn. Hãy điền thông tin vào đây để nhận được sự hỗ trợ</h2>
                  <Form layout="vertical" form={form} onFinish={onFinish}>
                        <Form.Item
                              label="Họ và tên"
                              name="fullName"
                              rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                        >
                              <Input placeholder="Họ và tên" />
                        </Form.Item>
                        <Form.Item
                              label="Số điện thoại"
                              name="phoneNumber"
                              rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                        >
                              <Input placeholder="Họ và tên" />
                        </Form.Item>
                        <Form.Item
                              label="Email"
                              name="email"
                              rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                        >
                              <Input placeholder="Họ và tên" />
                        </Form.Item>
                        <Form.Item
                              label="Chọn trang trại muốn đi"
                              name="farmId"
                              rules={[{ required: true, message: 'Vui lòng chọn trang trại!' }]}
                        >
                              <Select mode="multiple" placeholder="Chọn các trang trại mong muốn" options={farms}>
                              </Select>
                        </Form.Item>
                        <Form.Item
                              label="Số lượng người đi"
                              name="numberOfParticipate"
                              rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                        >
                              <Input placeholder="Họ và tên" />
                        </Form.Item>
                        <Row>
                              <Col span={12}>
                                    <Form.Item
                                          label="Ngày bắt đầu"
                                          name="startTime"
                                          rules={[
                                                { required: true, message: "Vui lòng chọn ngày bắt đầu!" },
                                          ]}
                                    >
                                          <DatePicker style={{ width: "100%" }} />
                                    </Form.Item>
                              </Col>
                              <Col span={12}>
                                    <Form.Item
                                          label="Ngày kết thúc"
                                          name="finishTime"
                                          rules={[
                                                { required: true, message: "Vui lòng chọn ngày kết thúc!" },
                                          ]}
                                    >
                                          <DatePicker style={{ width: "100%" }} />
                                    </Form.Item>
                              </Col>
                              <Col span={0}>
                                    <Form.Item
                                          label="Kiểu chuyến đi"
                                          name="type"
                                          value="custom"
                                    ></Form.Item>
                              </Col>
                        </Row>
                        <Form.Item label="Lời nhắn" name="description" initialValue="">
                              <TextArea placeholder='Lời nhắn (nếu có)' />
                        </Form.Item>
                        <Form.Item>
                              <Button type="primary" htmlType="submit" loading={loading}>
                                    Gửi
                              </Button>
                        </Form.Item>
                  </Form>
            </>
      )
}
export default FormTour;