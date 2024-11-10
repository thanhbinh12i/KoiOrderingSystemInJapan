import { Form, Input, Button, Card, Row, Col, Typography } from "antd";
import { CreditCardOutlined } from "@ant-design/icons";
import { useLocation, useParams } from "react-router-dom";
import { get, post } from "../../utils/request";
import { useEffect, useState } from "react";

const { Title } = Typography;

function PayBooking() {
  const location = useLocation();
  const { price } = location.state || { price: 0 };
  const params = useParams();
  const [quotation, setQuotation] = useState({});
  const [form] = Form.useForm();
  useEffect(() => {
    const fetchApi = async () => {
      const response = await get(`quotation/view/${params.id}`);
      if (response) {
        setQuotation(response);
      }
    };
    fetchApi();
  });
  const onFinishVNPay = async (values) => {
    let amount = price;
    if (amount > 20000000) {
      amount = amount / 10;
    }
    try {
      const paymentData = {
        orderType: "VN PAY",
        amount: amount,
        orderDescription: `Thanh toán cho đơn hàng ${params.id}`,
        name: values.userFullName,
        quotationId: params.id,
      };
      const getTimeCurrent = () => {
        return new Date().toLocaleString();
      };
      const paymentResponse = await post("payment", paymentData);

      if (paymentResponse) {
        localStorage.setItem(
          "pendingPaymentData",
          JSON.stringify({
            ...values,
            tourPrice: price,
            quotationId: params.id,
            paymentDate: getTimeCurrent(),
          })
        );
        window.location.href = paymentResponse;
      }
    } catch (error) {
      console.error("Lỗi khi xử lý thanh toán VNPay:", error);
    }
  };
  return (
    <>
      <div className="payment-page">
        <Row justify="center" align="middle">
          <Col xs={24} sm={20} md={16} lg={12} xl={8}>
            <Card className="payment-card">
              <Title level={2} className="payment-title">
                <CreditCardOutlined /> Thanh toán
              </Title>
              <Form
                name="payment_form"
                layout="vertical"
                onFinish={onFinishVNPay}
                form={form}
                initialValues={quotation}
              >
                <Form.Item
                  name="userFullName"
                  label="Họ và tên"
                  rules={[
                    { required: true, message: "Vui lòng nhập họ và tên!" },
                  ]}
                >
                  <Input placeholder="Họ và tên" />
                </Form.Item>
                <Form.Item
                  label="Số điện thoại"
                  name="phoneNumber"
                  rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại!" },
                    {
                      pattern: /^0\d{9}$/,
                      message: "Số điện thoại không hợp lệ!",
                    },
                  ]}
                >
                  <Input placeholder="Số điện thoại" />
                </Form.Item>
                <Form.Item
                  name="Email"
                  label="email"
                  rules={[
                    { type: "email", message: "Email không hợp lệ!" },
                    { required: true, message: "Vui lòng email!" },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                  name="tourPrice"
                  label="Số tiền"
                  initialValue={price}
                >
                  <Input value={price} disabled />
                </Form.Item>
                <Form.Item>
                  <Button
                    htmlType="submit"
                    size="large"
                    block
                    icon={<CreditCardOutlined />}
                  >
                    Thanh toán qua VNPay
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
export default PayBooking;
