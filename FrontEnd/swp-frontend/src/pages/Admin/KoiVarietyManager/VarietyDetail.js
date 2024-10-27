import { Modal } from "antd";

function VarietyDetail(props) {
  const { isModalVisible, handleCancel, record } = props;

  return (
    <>
      <Modal visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <div>
          <div className="mb-20">
            <img
              style={{ width: 200 }}
              src={`https://koidayne.azurewebsites.net/uploads/koiVariety/${record.urlImage}`}
              alt=""
            />
          </div>
          <div className="mb-20">
            <p>
              Tên giống cá: <strong>{record.varietyName}</strong>
            </p>
          </div>

          <div className="mb-20">
            <p>Mô tả: </p>
            <strong>{record.description}</strong>
          </div>
        </div>
      </Modal>
    </>
  );
}
export default VarietyDetail;
