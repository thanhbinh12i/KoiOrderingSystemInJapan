import { Modal } from "antd";

function ServiceDetail(props) {
      const { isModalVisible, handleCancel, record } = props;

      return (
            <>
                  <Modal
                        visible={isModalVisible}
                        onCancel={handleCancel}
                        footer={null}>
                        <div>
                              <div className="mb-20">
                                    <p>Tên dịch vụ: <strong>{record.serviceName}</strong></p>
                              </div>
                              <div className="mb-20">
                                    <p>Giá tiền: <strong>{record.price}</strong></p>
                              </div>
                              <div className="mb-20">
                                    <p>Mô tả: </p>
                                    <strong>{record.detail}</strong>
                              </div>
                        </div>
                  </Modal>
            </>
      )
}
export default ServiceDetail;