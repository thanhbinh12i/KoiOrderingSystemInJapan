import { useEffect, useState } from "react";
import { get, put } from "../../../utils/request";
import { Button, Card, DatePicker, List, Modal } from "antd";
function EstiminatedDate() {
      const [deliveryList, setDeliveryList] = useState([]);
      const [modalVisible, setModalVisible] = useState(false);
      const [currentItem, setCurrentItem] = useState(null);
      const [newDate, setNewDate] = useState(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            const fetchApi = async () => {
                  try {
                        setLoading(true);
                        const response = await get("delivery-status/view-all");
                        if (response) {
                              setDeliveryList(response);
                        }
                  } catch (error) {
                        console.error('Không thể tải danh sách giao hàng');
                  } finally {
                        setLoading(false);
                  }
            }
            fetchApi();
      }, [])
      const showModal = (item) => {
            setCurrentItem(item);
            setModalVisible(true);
      };
      const handleOk = async () => {
            if (currentItem && newDate) {
                  const data = {
                        "deliveryAddress": currentItem.deliveryAddress,
                        "deliveryStatusText": "Đang chờ vận chuyển",
                        "estimatedDate": newDate.format('DD-MM-YYYY')
                  }
                  const response = await put(`delivery-status/update/${currentItem.deliveryStatusId}`, data);
                  if (response) {
                        setDeliveryList(prevList =>
                              prevList.map(item =>
                                    item.billId === currentItem.billId
                                          ? { ...item, deliveryStatusText: "Đang chờ vận chuyển", estimatedDate: newDate.format('DD-MM-YYYY') }
                                          : item
                              )
                        );
                  }
            }
            setModalVisible(false);
            setNewDate(null);
      };

      const handleCancel = () => {
            setModalVisible(false);
      };

      return (
            <>
                  <Card>
                        <List
                              loading={loading}
                              dataSource={deliveryList}
                              renderItem={(item) => (
                                    <List.Item>
                                          <div>
                                                <p>Đơn hàng số <strong>{item.billId}</strong></p>
                                                <p>Địa chỉ: <strong>{item.deliveryAddress}</strong></p>
                                                <p>Ngày giao hàng: <strong>{item.estimatedDate}</strong></p>
                                                <p>Trạng thái: <strong>{item.deliveryStatusText}</strong></p>
                                                {item.deliveryStatusText === "Đã thanh toán" &&  (
                                                      <Button type="primary" onClick={() => showModal(item)}>Cập nhật ngày</Button>
                                                )}
                                          </div>
                                    </List.Item>
                              )}
                        />
                  </Card>
                  <Modal
                        title="Cập nhật ngày giao hàng"
                        visible={modalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                  >
                        {currentItem && (
                              <>
                                    <p>Nhập ngày giao hàng: </p>
                                    <DatePicker onChange={(date) => setNewDate(date)} format="DD-MM-YYYY"/>
                              </>
                        )}
                  </Modal>
            </>
      )
}
export default EstiminatedDate;