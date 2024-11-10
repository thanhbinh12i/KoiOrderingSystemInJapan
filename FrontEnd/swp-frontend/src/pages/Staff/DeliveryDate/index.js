import { useEffect, useState } from "react";
import { get, put } from "../../../utils/request";
import { Button, Card, Col, DatePicker, List, Modal, Pagination, Row, Steps } from "antd";
import { ClockCircleOutlined, FileDoneOutlined, CarOutlined, ShoppingOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import "./Delivery.scss";

function DeliveryDate() {
      const [deliveryList, setDeliveryList] = useState([]);
      const [loading, setLoading] = useState(true);
      const [receivedPayment, setReceivedPayment] = useState({});
      const [currentItem, setCurrentItem] = useState(null);
      const [modalVisible, setModalVisible] = useState(false);
      const [newDate, setNewDate] = useState(null);
      const [currentPage, setCurrentPage] = useState(1);
      const pageSize = 4;

      const getCurrentPageData = () => {
            const startIndex = (currentPage - 1) * pageSize;
            return deliveryList.slice(startIndex, startIndex + pageSize);
      };
      const fetchApi = async () => {
            try {
                  setLoading(true);
                  const response = await get("delivery-status/view-all");
                  if (response) {
                        const filteredList = response.filter(item => item.estimatedDate);
                        setDeliveryList(filteredList.reverse());
                        const paymentState = {};
                        response.forEach(item => { paymentState[item.billId] = false; });
                        setReceivedPayment(paymentState);
                  }
            } catch (error) {
                  console.error('Không thể tải danh sách giao hàng');
            } finally {
                  setLoading(false);
            }
      }
      useEffect(() => {
            fetchApi();
      }, [])
      const handleUpdate = async (itemToUpdate, title) => {
            const data = {
                  "deliveryAddress": itemToUpdate.deliveryAddress,
                  "deliveryStatusText": title,
                  "estimatedDate": itemToUpdate.estimatedDate
            }
            const response = await put(`delivery-status/update/${itemToUpdate.deliveryStatusId}`, data);
            if (response) {
                  fetchApi();
            }
      };
      const steps = [
            {
                  title: 'Đang chờ vận chuyển',
                  icon: <ClockCircleOutlined />,
            },
            {
                  title: 'Đã nhận hàng',
                  icon: <FileDoneOutlined />,
            },
            {
                  title: 'Đang vận chuyển',
                  icon: <CarOutlined />,
            },
            {
                  title: 'Đơn hàng đã giao đến bạn',
                  icon: <ShoppingOutlined />,
            },
            {
                  title: 'Giao hàng thành công',
                  icon: <CheckCircleOutlined />
            }
      ];
      const getCurrentStep = (status) => {
            if (status.includes('Từ chối nhận hàng') || status === 'Đã hoàn tiền cọc') return 4;
            return steps.findIndex(step => step.title === status);
      };

      const getStepStatus = (currentStatus, stepIndex) => {
            const currentStep = getCurrentStep(currentStatus);
            if (stepIndex === currentStep) return 'process';
            if (stepIndex < currentStep) return 'finish';
            return 'wait';
      };

      const handlePaymentConfirmation = async (item) => {
            const response = await get(`payStatus/view-billId/${item.billId}`);
            if (response.status === "Đã thanh toán") {
                  setReceivedPayment(prev => ({
                        ...prev,
                        [item.billId]: true
                  }));
                  handleUpdate(item, 'Giao hàng thành công');
            }
      };
      const handleDepositRefund = async (item) => {
            try {
                  setLoading(true);
                  const billResponse = await get(`bill/view-by-id/${item.billId}`);
                  const customerEmail = billResponse.email;
                  const cancellationTemplate = CancelOrderTemplate({ item, billResponse });
                  const data = {
                        deliveryAddress: item.deliveryAddress,
                        deliveryStatusText: "Đã hoàn tiền cọc",
                        estimatedDate: item.estimatedDate,
                  };
                  const response = await put(`delivery-status/update/${item.deliveryStatusId}`, data);

                  if (response) {
                        fetchApi();
                        const emailData = {
                              toEmail: customerEmail,
                              subject: `Hoàn tiền đơn hàng- Mã đơn ${item.billId}`,
                              message: cancellationTemplate,
                        };
                        const responseEmail = await fetch(`${process.env.REACT_APP_API_URL}email/send`,
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

      }
      const showModal = (item) => {
            setCurrentItem(item);
            setModalVisible(true);
      };
      const handleUpdateDeliveryDate = async () => {
            if (currentItem && newDate) {
                  const data = {
                        "deliveryAddress": currentItem.deliveryAddress,
                        "deliveryStatusText": currentItem.deliveryStatusText,
                        "estimatedDate": newDate.format('DD-MM-YYYY')
                  }
                  const response = await put(`delivery-status/update/${currentItem.deliveryStatusId}`, data);
                  if (response) {
                        fetchApi();
                  }
            }
            setModalVisible(false);
            setNewDate(null);
      }
      const handleCancel = () => {
            setModalVisible(false);
      };

      return (
            <>
                  <div className="delivery">
                        <Card className="delivery__list">
                              <List
                                    loading={loading}
                                    dataSource={getCurrentPageData()}
                                    renderItem={(item) => (
                                          <List.Item>
                                                <Row gutter={20} >
                                                      <Col span={12} className="delivery__info">
                                                            <p>Đơn hàng số <strong>{item.billId}</strong></p>
                                                            <p>Địa chỉ: <strong>{item.deliveryAddress}</strong></p>
                                                            <p>Ngày giao hàng: <strong>{item.estimatedDate}</strong></p>
                                                            <p>Trạng thái: <strong>{item.deliveryStatusText}</strong></p>
                                                      </Col>
                                                      <Col span={12} className="delivery__actions">
                                                            <Button className="delivery__detail">Xem chi tiết đơn hàng</Button>
                                                            <div className="delivery__status">
                                                                  {(item.deliveryStatusText === 'Đơn hàng đã giao đến bạn' && !receivedPayment[item.billId] && (
                                                                        <Button type="primary" onClick={() => handlePaymentConfirmation(item)}>
                                                                              Xác nhận đã nhận tiền
                                                                        </Button>
                                                                  )) || (item.deliveryStatusText.includes('Từ chối nhận hàng') && (
                                                                        <Button type="primary" onClick={() => handleDepositRefund(item)}>
                                                                              Xác nhận hoàn tiền cọc
                                                                        </Button>
                                                                  )) || (['Đang chờ vận chuyển', 'Đã nhận hàng', 'Đang vận chuyển'].includes(item.deliveryStatusText) && (

                                                                        <>
                                                                              <Button type="primary" onClick={() => showModal(item)}>
                                                                                    Cập nhật ngày giao hàng
                                                                              </Button>
                                                                              <Modal
                                                                                    title="Cập nhật ngày giao hàng"
                                                                                    visible={modalVisible}
                                                                                    onOk={handleUpdateDeliveryDate}
                                                                                    onCancel={handleCancel}
                                                                              >
                                                                                    {currentItem && (
                                                                                          <>
                                                                                                <p>Nhập ngày giao hàng: </p>
                                                                                                <DatePicker onChange={(date) => setNewDate(date)} format="DD-MM-YYYY" />
                                                                                          </>
                                                                                    )}
                                                                              </Modal></>
                                                                  ))}
                                                            </div>

                                                      </Col>
                                                      <Col span={24} className="delivery__step">
                                                            <Steps
                                                                  items={steps.map((step, index) => ({
                                                                        title: (item.deliveryStatusText.includes('Từ chối nhận hàng') || item.deliveryStatusText === 'Đã hoàn tiền cọc') && index === 4
                                                                              ? 'Từ chối nhận hàng'
                                                                              : step.title,
                                                                        icon: (item.deliveryStatusText.includes('Từ chối nhận hàng') || item.deliveryStatusText === 'Đã hoàn tiền cọc') && index === 4
                                                                              ? <CloseCircleOutlined />
                                                                              : step.icon,
                                                                        status: getStepStatus(item.deliveryStatusText, index),
                                                                        description: index !== 4 && (
                                                                              <Button
                                                                                    type="primary"
                                                                                    onClick={() => handleUpdate(item, step.title)}
                                                                                    disabled={
                                                                                          index !== getCurrentStep(item.deliveryStatusText) + 1 
                                                                                    }
                                                                              >
                                                                                    Cập nhật
                                                                              </Button>
                                                                        )
                                                                  }))}
                                                            />
                                                      </Col>
                                                </Row>
                                          </List.Item>

                                    )}
                              />
                              <div style={{ marginTop: '20px', textAlign: 'right' }}>
                                    <Pagination
                                          current={currentPage}
                                          onChange={(page) => setCurrentPage(page)}
                                          total={deliveryList.length}
                                          pageSize={pageSize}
                                          showSizeChanger={false}
                                          showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} đặt chỗ`}
                                    />
                              </div>
                        </Card>
                  </div>
            </>
      )
}
export default DeliveryDate;

const CancelOrderTemplate = (props) => {
      const { item, billResponse } = props;
      const refundAmount = billResponse.koiPrice * 0.2;
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
                        <h2>✨ Hoàn tiền đơn hàng cá Koi ✨</h2>
    
                        <p><span class="greeting">Kính gửi Quý khách,</span></p>
    
                        <p>Chúng tôi xin gửi lời cảm ơn chân thành đến Quý khách đã quan tâm và sử dụng dịch vụ của Koi Dayne ✨.</p>
    
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
                                <span class="currency refund">${formatCurrency(refundAmount)}</span>
                            </div>
                        </div>
    
                        <p>Theo chính sách của chúng tôi, quý khách sẽ được hoàn lại 100% số tiền cọc đã thanh toán, tương đương <span class="currency refund">${formatCurrency(refundAmount)}</span>.</p>
    
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
