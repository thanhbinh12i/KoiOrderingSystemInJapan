import { useEffect, useState } from "react";
import { get, post } from "../../utils/request";
import { Button, Table } from "antd";
import { Link } from "react-router-dom";
import CancelOrder from "./CancelOrder";

function MyOrder() {
      //xem chi tiết đơn hàng
      const [deliveryList, setDeliveryList] = useState([]);
      const [loading, setLoading] = useState(true);
      const userId = localStorage.getItem("id");
      const fetchApi = async () => {
            try {
                  setLoading(true);
                  const response = await get(`delivery-status/view-by-user-id/${userId}`);
                  if (response) {
                        setDeliveryList(response);
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
                  title: 'Hành động',
                  key: 'action',
                  render: (_, record) => {
                        if (record.deliveryStatusText === "Đơn hàng đã giao đến bạn") {
                              const onFinishVNPay = async () => {
                                    try {
                                          const billResponse = await get(`bill/view-by-id/${record.billId}`);
                                          const payStatusResponse = await get(`payStatus/view-billId/${record.billId}`);
                                          console.log(billResponse);
                                          console.log(payStatusResponse);
                                          const price = billResponse.koiPrice - payStatusResponse.deposit;
                                          // const paymentData = {
                                          //       orderType: "string",
                                          //       amount: price,
                                          //       orderDescription: `Thanh toán cho đơn hàng ${record.billId}`,
                                          //       name: billResponse.userFullName,
                                          //       quotationId: record.billId
                                          // };
                                          // const getTimeCurrent = () => {
                                          //       return new Date().toLocaleString();
                                          // };
                                          // const paymentResponse = await post('payment', paymentData);
                        
                                          // if (paymentResponse) {
                                          //       localStorage.setItem('pendingPaymentData', JSON.stringify({ paymentDate: getTimeCurrent() }));
                                          //       window.location.href = paymentResponse;
                                          // }
                                    } catch (error) {
                                          console.error('Lỗi khi xử lý thanh toán VNPay:', error);
                                    }
                              };
                              return (
                                    <>
                                          <Button type="primary" onClick={() => onFinishVNPay()}>
                                                Thanh toán
                                          </Button>
                                    </>
                              )
                        } else if (record.deliveryStatusText === "Giao hàng thành công") {
                              return (
                                    <>
                                          <Link to={`feedback/${userId}`}>
                                                <Button type="primary">Đánh giá</Button>
                                          </Link>
                                    </>
                              )
                        } else if (record.deliveryStatusText === "Đang chờ vận chuyển") {
                              return (
                                    <>
                                          <Button color="primary" onClick={() => showModal()} danger>
                                                Hủy đơn
                                          </Button>
                                          <CancelOrder record={record} isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} />
                                    </>
                              )
                        } else {

                        }
                  }
            }
      ]
      return (
            <>
                  <Table dataSource={deliveryList} columns={columns} bordered />
            </>
      );
}
export default MyOrder;
