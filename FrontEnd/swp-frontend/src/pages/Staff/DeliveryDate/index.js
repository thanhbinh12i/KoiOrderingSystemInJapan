import { useEffect, useState } from "react";
import { get, put } from "../../../utils/request";
import { Button, Card, Input, List, Modal } from "antd";

function DeliveryDate(){
      const [deliveryList, setDeliveryList] = useState([]);
      const [modalVisible, setModalVisible] = useState(false);
      const [currentItem, setCurrentItem] = useState(null);
      const [newStatus, setNewStatus] = useState(null);
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
            if (currentItem && newStatus) {
                  const data = {
                        "deliveryAddress": currentItem.deliveryAddress,
                        "deliveryStatusText": newStatus,
                        "estimatedDate": currentItem.eliminatedDate
                  }
                  const response = await put(`delivery-status/update/${currentItem.deliveryStatusId}`, data);
                  if (response) {
                        setDeliveryList(prevList =>
                              prevList.map(item =>
                                    item.billId === currentItem.billId
                                          ? { ...item, deliveryStatusText: newStatus }
                                          : item
                              )
                        );
                  }
            }
            setModalVisible(false);
            setNewStatus(null);
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
                                                <Button type="primary" onClick={() => showModal(item)}>Cập nhật trạng thái</Button>
                                          </div>
                                    </List.Item>
                              )}
                        />
                  </Card>
                  <Modal
                        title="Cập nhật trạng thái giao hàng"
                        visible={modalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                  >
                        {currentItem && (
                              <>
                                    <p>Nhập trạng thái: </p>
                                    <Input onChange={(status) => setNewStatus(status)} />
                              </>
                        )}
                  </Modal>
            </>
      )
}
export default DeliveryDate;