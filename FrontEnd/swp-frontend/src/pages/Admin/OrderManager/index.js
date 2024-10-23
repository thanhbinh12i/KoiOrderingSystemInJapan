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
                  const cancellationTemplate = ``;
                  const data = {
                        "deliveryAddress": item.deliveryAddress,
                        "deliveryStatusText": "Đã hủy",
                        "estimatedDate": item.estimatedDate
                  }
                  const response = await put(`delivery-status/update/${item.deliveryStatusId}`, data);
                  if (response) {
                        fetchApi();
                        const emailData = {
                              "toEmail": "nptbinh17092004@gmail.com",
                              "subject": `Xác nhận hủy đơn đặt hàng- Mã đơn ${item.quotationId}`,
                              "message": cancellationTemplate
                        };
                        const responseEmail = await fetch("https://koidayne.azurewebsites.net/api/email/send", {
                              method: "POST",
                              headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json"
                              },
                              body: JSON.stringify(emailData)
                        })
                        if (responseEmail) {
                              console.log('Đã gửi email xác nhận hủy đơn thành công');
                        }

                  }
            } catch (error) {
                  console.error('Lỗi khi gửi email:', error);
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
                                                      {
                                                            item.deliveryStatusText === "Yêu cầu hủy đơn" && (
                                                                  <>
                                                                        <Button type="primary" onClick={() => handleCancel(item)} loading={loading}>
                                                                              Xác nhận hủy
                                                                        </Button>
                                                                  </>
                                                            )
                                                      }

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
      )
}
export default OrderManager;