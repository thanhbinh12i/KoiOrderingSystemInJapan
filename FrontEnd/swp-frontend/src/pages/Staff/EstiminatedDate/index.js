import { useEffect, useState } from "react";
import { get, put } from "../../../utils/request";
import { Button, Card, DatePicker, List, Modal, Pagination } from "antd";
import moment from "moment";
function EstiminatedDate() {
      const [deliveryList, setDeliveryList] = useState([]);
      const [modalVisible, setModalVisible] = useState(false);
      const [currentItem, setCurrentItem] = useState(null);
      const [newDate, setNewDate] = useState(null);
      const [loading, setLoading] = useState(true);
      const [currentPage, setCurrentPage] = useState(1);
      const pageSize = 4;

      const getCurrentPageData = () => {
            const startIndex = (currentPage - 1) * pageSize;
            return deliveryList.slice(startIndex, startIndex + pageSize);
      };
      useEffect(() => {
            const fetchApi = async () => {
                  try {
                        setLoading(true);
                        const response = await get("delivery-status/view-all");
                        if (response) {
                              const tourResponses = await Promise.all(
                                    response.map(async (item) => {
                                          const tourResponse = await get(`tour/view-billId/${item.billId}`);
                                          return {
                                                ...item,
                                                tourDetail: tourResponse
                                          }
                                    })
                              )
                              setDeliveryList(tourResponses.reverse());
                        }
                  } catch (error) {
                        console.error('Không thể tải danh sách giao hàng');
                  } finally {
                        setLoading(false);
                  }
            }
            fetchApi();
      }, [])
      const disablePastDates = (current) => {
            return current && current <= moment(currentItem.tourDetail[0].finishTime, "DD-MM-YYYY").startOf('day');
      };

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
                              prevList.map(item => item.billId === currentItem.billId
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
                              dataSource={getCurrentPageData()}
                              renderItem={(item) => (
                                    <List.Item>
                                          <div>
                                                <p>Đơn hàng số <strong>{item.billId}</strong></p>
                                                <p>Địa chỉ: <strong>{item.deliveryAddress}</strong></p>
                                                <p>Ngày giao hàng: <strong>{item.estimatedDate}</strong></p>
                                                <p>Trạng thái: <strong>{item.deliveryStatusText}</strong></p>
                                                {item.deliveryStatusText === "Đã thanh toán" && (
                                                      <Button type="primary" onClick={() => showModal(item)}>Cập nhật ngày</Button>
                                                )}
                                          </div>
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
                                    showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} mục`}
                              />
                        </div>
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
                                    <DatePicker onChange={(date) => setNewDate(date)} format="DD-MM-YYYY" disabledDate={disablePastDates} />
                              </>
                        )}
                  </Modal>
            </>
      )
}
export default EstiminatedDate;