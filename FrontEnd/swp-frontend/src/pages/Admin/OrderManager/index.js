import { Button, Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { get, put } from "../../../utils/request";

function OrderManager() {
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchApi = async () => {
    const response = await get("delivery-status/view-all");
    if (response) {
      setOrderList(response);
    }
  };
  useEffect(() => {
    fetchApi();
  }, []);
  const handleCancel = async (item) => {
    try {
      setLoading(true);
      const billResponse = await get(`bill/view-by-id/${item.billId}`);
      const customerEmail = billResponse.email;
      const cancellationTemplate = CancelOrderTemplate({ item, billResponse });
      const data = {
        deliveryAddress: item.deliveryAddress,
        deliveryStatusText: "Đã hủy",
        estimatedDate: item.estimatedDate,
      };
      const response = await put(
        `delivery-status/update/${item.deliveryStatusId}`,
        data
      );

      if (response) {
        const emailData = {
          toEmail: customerEmail,
          subject: `Xác nhận hủy đơn đặt hàng- Mã đơn ${item.billId}`,
          message: cancellationTemplate,
        };
        const responseEmail = await fetch(
          `${process.env.REACT_APP_API_URL}email/send`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(emailData),
          }
        );
        if (responseEmail) {
          fetchApi();
        }
      }
    } catch (error) {
      console.error("Lỗi khi gửi email:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {orderList.length > 0 ? (
        <>
          <Row gutter={[20, 20]}>
            {orderList.map((item) => (
              <Col span={8} key={item.deliveryId}>
                <Card title={`Đơn hàng số ${item.billId}`}>
                  <p>
                    Địa chỉ: <strong>{item.deliveryAddress}</strong>
                  </p>
                  <p>
                    Trạng thái: <strong>{item.deliveryStatusText}</strong>
                  </p>
                  <p>
                    Ngày nhận hàng: <strong>{item.estimatedDate}</strong>
                  </p>
                  {item.deliveryStatusText === "Yêu cầu hủy đơn" && (
                    <>
                      <Button
                        type="primary"
                        onClick={() => handleCancel(item)}
                        loading={loading}
                      >
                        Xác nhận hủy
                      </Button>
                    </>
                  )}
                </Card>
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <>
          <h1>Không có báo giá nào</h1>
        </>
      )}
    </>
  );
}
export default OrderManager;

const CancelOrderTemplate = (props) => {
  const { item, billResponse } = props;
  const refundAmount = billResponse.koiPrice;
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    })
      .format(amount)
      .replace("₫", "đ");
  };

  return `
        <html>
            <head>
                <meta charset="UTF-8" />
                <style>
                    body {
                        background-color: #f0f7ff;
                        margin: 0;
                        padding: 40px 0;
                        font-family: 'Arial', sans-serif;
                    }
                    .cancellation-email {
                        background-color: #ffffff;
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 30px;
                        border-radius: 15px;
                        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                        border: 1px solid black;
                    }
                    h2 { 
                        color: #1677ff;
                        text-align: center;
                        font-size: 24px;
                        margin-bottom: 25px;
                        padding-bottom: 15px;
                        border-bottom: 2px solid #e6f4ff;
                    }
                    .order-details {
                        background-color: #f8fbff;
                        padding: 20px;
                        margin: 20px 0;
                        border-radius: 10px;
                        border: 1px solid #e6f4ff;
                    }
                    .order-details h3 {
                        color: #1677ff;
                        margin-top: 0;
                        font-size: 18px;
                    }
                    .currency { 
                        font-weight: bold;
                        color: #2f54eb;
                    }
                    .currency.refund { 
                        color: #52c41a;
                        font-size: 1.1em;
                    }
                    .footer {
                        margin-top: 30px;
                        padding-top: 20px;
                        border-top: 2px solid #e6f4ff;
                        font-size: 12px;
                        color: #8c8c8c;
                        text-align: center;
                    }
                    .greeting {
                        color: #1677ff;
                        font-weight: bold;
                    }
                    .order-id {
                        background-color: #e6f4ff;
                        padding: 3px 8px;
                        border-radius: 4px;
                        color: #1677ff;
                        font-weight: bold;
                    }
                    .details-row {
                        display: flex;
                        justify-content: space-between;
                        margin: 10px 0;
                        padding: 5px 0;
                        border-bottom: 1px dashed #e6f4ff;
                    }
                    .details-label {
                        color: #595959;
                        font-weight: bold;
                    }
                    .signature {
                        margin-top: 30px;
                        padding-top: 20px;
                        border-top: 1px solid #e6f4ff;
                        color: #1677ff;
                        font-style: italic;
                    }
                </style>
            </head>
            <body>
                <div class="cancellation-email">
                    <h2>✨ Xác nhận hủy đơn hàng cá Koi ✨</h2>

                    <p><span class="greeting">Kính gửi Quý khách,</span></p>

                    <p>Chúng tôi xin gửi lời cảm ơn chân thành đến Quý khách đã quan tâm và sử dụng dịch vụ của Koi Dayne ✨. Chúng tôi đã nhận được yêu cầu hủy đơn hàng của Quý khách và xin xác nhận rằng đơn hàng đã được hủy thành công.</p>

                    <div class="order-details">
                        <h3>🗒️ Thông tin đơn hàng</h3>
                        <div class="details-row">
                            <span class="details-label">Mã đơn hàng: </span>
                            <span>${item.billId}</span>
                        </div>
                        <div class="details-row">
                            <span class="details-label">Địa chỉ đơn hàng: </span>
                            <span>${item.deliveryAddress}</span>
                        </div>
                        <div class="details-row">
                            <span class="details-label">Số tiền hoàn lại: </span>
                            <span class="currency refund">${formatCurrency(
                              refundAmount
                            )}</span>
                        </div>
                    </div>

                    <p>Theo chính sách của chúng tôi, yêu cầu hủy đơn của Quý khách đã được chấp nhận. Quý khách sẽ được hoàn lại 100% số tiền đã thanh toán, tương đương <span class="currency refund">${formatCurrency(
                      refundAmount
                    )}</span>.</p>

                    <p>Chúng tôi thực sự tiếc rằng không thể phục vụ Quý khách trong lần này. Koi Dayne cam kết sẽ không ngừng cải thiện chất lượng sản phẩm và dịch vụ để mang đến trải nghiệm tốt nhất cho Quý khách trong những lần mua sắm tiếp theo ✨</p>

                    <p>Nếu Quý khách có bất kỳ câu hỏi hoặc thắc mắc nào, xin vui lòng liên hệ với chúng tôi qua:</p>
                        <ul>
                              <li>Hotline: 094 818 2978</li>
                              <li>Email: managerkoidayne@gmail.com</li>
                        </ul>

                    <div class="signature">
                        <p>Trân trọng,<br />Koi đây nè ✨</p>
                    </div>

                    <div class="footer">
                        <p>✨ Koi Dayne - Đồng Hành Cùng Phong Cách Của Bạn ✨</p>
                    </div>
                </div>
            </body>
        </html>
    `;
};
