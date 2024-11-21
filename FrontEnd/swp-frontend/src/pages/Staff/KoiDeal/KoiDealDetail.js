import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get, put } from "../../../utils/request";
import GoBack from "../../../components/GoBack";
import { Button, Card, Image, Input, List, Modal, Pagination } from "antd";
import Swal from "sweetalert2";

function KoiDealDetail() {
      const params = useParams();
      const [koiBill, setKoiBill] = useState([]);
      const [modalVisible, setModalVisible] = useState(false);
      const [currentKoi, setCurrentKoi] = useState(null);
      const [newPrice, setNewPrice] = useState('');
      const [error, setError] = useState('');
      const [currentPage, setCurrentPage] = useState(1);
      const pageSize = 3;

      const getCurrentPageData = () => {
            const startIndex = (currentPage - 1) * pageSize;
            return koiBill.slice(startIndex, startIndex + pageSize);
      };

      useEffect(() => {
            const fetchApi = async () => {
                  const response = await get(`koi-bill/view-by-billId/${params.id}`);
                  if (response) {
                        const cartItemsWithKoi = await Promise.all(
                              response.map(async (item) => {
                                    const koiResponse = await get(`koi/view-by-id/${item.koiId}`);
                                    return {
                                          ...item,
                                          koiDetails: koiResponse
                                    };
                              })
                        );

                        setKoiBill(cartItemsWithKoi);
                  }
            }
            fetchApi();
      }, [params.id]);

      const showModal = (koi) => {
            setCurrentKoi(koi);
            setNewPrice(koi.originalPrice);
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
                              Swal.fire({
                                    icon: "success",
                                    title: "Nhập giá thành công!!!",
                              });
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
                              koi.koiId === item.koiId ? { ...koi, finalPrice: item.originalPrice } : koi
                        ));
                        Swal.fire({
                              icon: "success",
                              title: "Xác nhận giá!!!",
                        });
                  }
            } catch (error) {
                  console.error('Error updating price:', error);
            }
      }
      const handleChange = (e) => {
            const value = e.target.value;
            if (value <= 0) {
                  setError("Giá nhập vào phải lớn hơn 0");
            } else {
                  setError('');
            }
            setNewPrice(value);
      }
      return (
            <>
                  <GoBack />
                  <div className="koi-deal">
                        <Card>
                              <List
                                    dataSource={getCurrentPageData()}
                                    renderItem={(item) => (
                                          <List.Item>
                                                <div className="koi-deal__item">
                                                      <div className="koi-deal__info">
                                                            <div className="koi-deal__price">
                                                                  <h3>Koi {item.koiName}</h3>
                                                                  <p>Số lượng: <strong>{item.quantity}</strong></p>
                                                                  <p>Giá tiền gốc: <strong>{item.originalPrice.toLocaleString()} đ</strong></p>
                                                                  <p>Giá tiền chốt: <strong>{item.finalPrice.toLocaleString()} đ</strong></p>
                                                            </div>
                                                            <div className="koi-deal__img">
                                                                  <Image width={150}
                                                                        alt={item.koiName}
                                                                        src={`${process.env.REACT_APP_API_URL_UPLOAD}koi/${item.koiDetails.koiImages[0]?.urlImage}`}
                                                                        preview
                                                                  />
                                                            </div>
                                                      </div>
                                                      <div className="koi-deal__button">
                                                            {
                                                                  item.finalPrice === 0 && (
                                                                        <Button type="primary" onClick={() => handleConfirm(item)} className="mr-10">Xác nhận</Button>
                                                                  )
                                                            }
                                                            <Button onClick={() => showModal(item)}>Cập nhật giá</Button>
                                                      </div>
                                                </div>

                                          </List.Item>
                                    )}

                              />
                              <div style={{ marginTop: '20px', textAlign: 'right' }}>
                                    <Pagination
                                          current={currentPage}
                                          onChange={(page) => setCurrentPage(page)}
                                          total={koiBill.length}
                                          pageSize={pageSize}
                                          showSizeChanger={false}
                                          showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} mục`}
                                    />
                              </div>
                        </Card>
                  </div>

                  <Modal
                        title="Cập nhật giá"
                        visible={modalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                  >
                        {currentKoi && (
                              <>
                                    <p>Koi: {currentKoi.koiName}</p>
                                    <p>Giá hiện tại: {currentKoi.originalPrice.toLocaleString()} đ</p>
                                    <p>Nhập giá mới: </p>
                                    <Input
                                          type="number"
                                          value={newPrice}
                                          onChange={handleChange}
                                          placeholder="Nhập giá mới"

                                    />
                                    {error && <p style={{ color: 'red' }}>{error}</p>}
                              </>
                        )}
                  </Modal>
            </>
      );
};

export default KoiDealDetail;