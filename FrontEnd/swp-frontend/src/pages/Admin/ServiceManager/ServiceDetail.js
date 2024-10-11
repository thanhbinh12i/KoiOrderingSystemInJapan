import { Modal } from "antd";

function ServiceDetail(props) {
  const { isModalVisible, handleCancel, record } = props;

  return (
    <>
      <Modal visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <div>
          <div className="mb-20">
            <p>
              Kiểu vận chuyển: <strong>{record.deliveryType}</strong>
            </p>
          </div>
          <div className="mb-20">
            <p>
              Phí vận chuyển: <strong>{record.deliveryFee}</strong>
            </p>
          </div>
          <div className="mb-20">
            <p>Mô tả: </p>
            <strong>{record.deliveryDescription}</strong>
          </div>
        </div>
      </Modal>
    </>
  );
}
export default ServiceDetail;
