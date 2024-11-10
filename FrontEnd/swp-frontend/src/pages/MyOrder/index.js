import { useEffect, useState } from "react";
import { get } from "../../utils/request";
import { Button, Table } from "antd";
import { Link } from "react-router-dom";
import CancelOrder from "./CancelOrder";
import RefuseOrder from "./RefuseOrder";
import './MyOrder.scss'

function MyOrder() {
      const [deliveryList, setDeliveryList] = useState([]);
      const [loading, setLoading] = useState(true);
      const userId = localStorage.getItem("id");
      const fetchApi = async () => {
            try {
                  setLoading(true);
                  const response = await get(`delivery-status/view-by-user-id/${userId}`);
                  if (response) {
                        setDeliveryList(response.reverse());
                  }
            } catch (error) {
                  console.error("Không thể tải danh sách giao hàng");
            } finally {
                  setLoading(false);
            }
      }
      useEffect(() => {
            fetchApi();
            // eslint-disable-next-line
      }, [userId])
      const [isModalVisible, setIsModalVisible] = useState(false);
      const showModal = () => {
            setIsModalVisible(true);
      };

      const handleCancel = () => {
            setIsModalVisible(false);
      };
      const handleOk = async () => {
            handleCancel();
            fetchApi();
      };
      const isCompleted = (status) => {
            return status === 'Giao hàng thành công' ||
                  status.includes('Từ chối nhận hàng') ||
                  status === 'Đã hoàn tiền cọc';
      };
      const columns = [
            {
                  title: 'Đơn hàng',
                  dataIndex: 'billId',
                  key: 'billId',
            },
            {
                  title: 'Địa chỉ',
                  dataIndex: 'deliveryAddress',
                  key: 'deliveryAddress',
            },
            {
                  title: 'Trạng thái',
                  dataIndex: 'deliveryStatusText',
                  key: 'deliveryStatusText',
            },
            {
                  title: 'Ngày nhận hàng',
                  dataIndex: 'estimatedDate',
                  key: 'estimatedDate',
            },
            {
                  title: 'Xem đơn hàng',
                  key: 'view',
                  render: (_, record) => (
                        <Link to={`/my-orders/${record.billId}`}>
                              <Button type="primary">
                                    Xem chi tiết
                              </Button>
                        </Link>
                  )
            },
            {
                  title: 'Hành động',
                  key: 'action',
                  render: (_, record) => {
                        if (record.deliveryStatusText === "Đơn hàng đã giao đến bạn") {
                              return (
                                    <>
                                          <Link to={`/payment-remain/${record.billId}`} className="pr-10">
                                                <Button type="primary">
                                                      Đến trang thanh toán
                                                </Button>
                                          </Link>
                                          <Button color="primary" danger onClick={() => showModal()}>
                                                Không nhận hàng
                                          </Button>

                                          <RefuseOrder record={record} isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} />
                                    </>
                              )
                        } else if (isCompleted(record.deliveryStatusText)) {
                              return (
                                    <>
                                          <Link to={`feedback/${userId}`} >
                                                <Button type="primary" style={{ backgroundColor: '#52c41a', borderColor: '#52c41a', color: '#fff' }}>Đánh giá</Button>
                                          </Link>
                                    </>
                              )
                        } else {
                              return (
                                    <>
                                          <Button color="primary" onClick={() => showModal()} danger>
                                                Hủy đơn hàng
                                          </Button>
                                          <CancelOrder record={record} isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} />
                                    </>
                              )
                        }
                  }
            }
      ]
      return (
            <>
                  <div className="my-order">
                        <h2>Danh sách đơn hàng</h2>
                        <Table dataSource={deliveryList} columns={columns} loading={loading} bordered/>
                  </div>
            </>
      );
}
export default MyOrder;
