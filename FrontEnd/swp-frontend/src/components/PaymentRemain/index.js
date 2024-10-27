import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get, post } from "../../utils/request";
import { Button, Card, Space } from "antd";

function PaymentRemain() {
      //xem thêm thông tin đơn hàng
      const params = useParams();
      const [billData, setBillData] = useState(null);

      useEffect(() => {
            const fetchBillData = async () => {
                  try {
                        const response = await get(`bill/view-by-id/${params.id}`);
                        setBillData(response);
                  } catch (error) {
                        console.error('Lỗi khi lấy thông tin đơn hàng:', error);
                  }
            };
            fetchBillData();
      }, [params.id]);
      const onFinishVNPay = async () => {
            try {
                  const payStatusResponse = await get(`payStatus/view-billId/${params.id}`);

                  const paymentData = {
                        orderType: "VNPAY",
                        amount: payStatusResponse.remain,
                        orderDescription: `Thanh toán cho đơn hàng ${params.id}`,
                        name: billData.userFullName,
                        quotationId: params.id
                  };
                  const paymentResponse = await post('payment', paymentData);

                  if (paymentResponse) {
                        localStorage.setItem('pendingPaymentRemain', JSON.stringify({ payStatusResponse }));
                        window.location.href = paymentResponse;
                  }
            } catch (error) {
                  console.error('Lỗi khi xử lý thanh toán VNPay:', error);
            }
      };
      return (
            <>
                  <div style={{ padding: '24px', width: '300px' }}>
                        <Card title="Thông tin thanh toán">
                              {billData && (
                                    <>
                                          <p>Mã đơn hàng: {billData.billId}</p>
                                          <p>Người nhận: {billData.userFullName}</p>
                                          <p>Số tiền:</p>
                                    </>
                              )}

                              <Space direction="vertical" style={{ width: '100%', marginTop: '20px' }}>
                                    <Button type="primary" onClick={onFinishVNPay} block>
                                          Thanh toán qua VNPAY
                                    </Button>
                              </Space>
                        </Card>
                  </div>
            </>
      )
}
export default PaymentRemain;