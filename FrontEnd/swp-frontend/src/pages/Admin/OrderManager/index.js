import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { get } from "../../../utils/request";

function OrderManager() {
  const [orderList, setOrderList] = useState([]);
  const fetchApi = async () => {
    const response = await get("delivery-status/view-all");
    if (response) {
      setOrderList(response);
    }
  };
  useEffect(() => {
    fetchApi();
  }, []);
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
                </Card>
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <>
          <h1>Không có đơn hàng nào</h1>
        </>
      )}
    </>
  );
}
export default OrderManager;
