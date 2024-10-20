import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get, put } from "../../../utils/request";
import GoBack from "../../../components/GoBack";
import { Button, Card, Input, List, Modal } from "antd";

function KoiDealDetail() {
      const params = useParams();
      const [koiBill, setKoiBill] = useState([]);
      const [modalVisible, setModalVisible] = useState(false);
      const [currentKoi, setCurrentKoi] = useState(null);
      const [newPrice, setNewPrice] = useState('');

      useEffect(() => {
            const fetchApi = async () => {
                  const response = await get(`koi-bill/view-by-billId/${params.id}`);
                  if (response) {
                        setKoiBill(response);
                  }
            }
            fetchApi();
      }, [params.id]);

      const showModal = (koi) => {
            setCurrentKoi(koi);
            setNewPrice(koi.originalPrice.toString());
            setModalVisible(true);
      };

      const handleOk = async () => {
            if (currentKoi && newPrice) {
                  const data = {
                        "originalPrice": currentKoi.originalPrice,
                        "quantity": currentKoi.quantity,
                        "finalPrice": newPrice
                  }
                  try {
                        const response = await put(`koi-bill/update/${params.id}-${currentKoi.koiId}`, data)
                        if (response) {
                              setKoiBill(koiBill.map(koi =>
                                    koi.koiId === currentKoi.koiId ? { ...koi, finalPrice: parseFloat(newPrice) } : koi
                              ));
                        }
                  } catch (error) {
                        console.error('Error updating price:', error);
                  }
            }
            setModalVisible(false);
      };

      const handleCancel = () => {
            setModalVisible(false);
      };
      const handleConfirm = async (item) => {
            const data = {
                  "originalPrice": item.originalPrice,
                  "quantity": item.quantity,
                  "finalPrice": item.originalPrice
            }
            try {
                  const response = await put(`koi-bill/update/${params.id}-${item.koiId}`, data)
                  if (response) {
                        setKoiBill(koiBill.map(koi =>
                              koi.koiId === item.koiId ? { ...koi, finalPrice: parseFloat(newPrice) } : koi
                        ));
                  }
            } catch (error) {
                  console.error('Error updating price:', error);
            }
      }

      return (
            <>
                  <GoBack />
                  <Card>
                        <List
                              dataSource={koiBill}
                              renderItem={(item) => (
                                    <List.Item>
                                          <div>
                                                <h3>Koi {item.koiId}</h3>
                                                <p>Giá tiền gốc: <strong>{item.originalPrice} đ</strong></p>
                                                <p>Giá tiền chốt: <strong>{item.finalPrice} đ</strong></p>
                                                {
                                                      item.finalPrice === 0 && (
                                                            <Button type="primary" onClick={() => handleConfirm(item)}>Xác nhận</Button>
                                                      )
                                                }
                                                <Button onClick={() => showModal(item)}>Cập nhật giá</Button>
                                          </div>
                                    </List.Item>
                              )}
                        />
                  </Card>
                  <Modal
                        title="Cập nhật giá"
                        visible={modalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                  >
                        {currentKoi && (
                              <>
                                    <p>Koi: {currentKoi.koiName}</p>
                                    <p>Giá hiện tại: {currentKoi.originalPrice} đ</p>
                                    <p>Nhập giá mới: </p>
                                    <Input
                                          type="number"
                                          value={newPrice}
                                          onChange={(e) => setNewPrice(e.target.value)}
                                          placeholder="Nhập giá mới"
                                    />
                              </>
                        )}
                  </Modal>
            </>
      );
};

export default KoiDealDetail;