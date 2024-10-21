import { useEffect, useState } from "react";
import { get } from "../../utils/request";
import { Button, Table } from "antd";

function MyOrder() {
      //xem trạng thái vận chuyển đơn hàng, nút xác nhận nhận hàng và thanh toán tiền còn lại
      const [deliveryList, setDeliveryList] = useState([]);
      const [loading, setLoading] = useState(true);
      const userId = localStorage.getItem('id');

      useEffect(() => {
            const fetchApi = async () => {
                  try {
                        setLoading(true);
                        const response = await get(`delivery-status/view-by-user-id/${userId}`);
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
                        if (record.deliveryStatusText === "Đang chờ thanh toán") {
                              return (
                                    <>
                                          <Button type="primary">
                                                Thanh toán
                                          </Button>
                                    </>
                              )
                        }else if (record.deliveryStatusText === "Giao hàng thành công"){
                              return (
                                    <>
                                          <Button type="primary">
                                                Đánh giá
                                          </Button>
                                    </>
                              )
                        }else {
                              
                        }
                  }
            }
      ]
      return (
            <>
                  <Table dataSource={deliveryList} columns={columns} bordered />

            </>
      )
}
export default MyOrder;