import { Button, Popconfirm, Tooltip, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { del } from "../../../utils/request";

function DeleteKoiFarm(props) {
  const { record, handleReload } = props;
  const [messageApi, contextHolder] = message.useMessage();

  const handleDelete = async () => {
    try {
      const response = await del("koiFarm/delete", record.farmId);
      if (response) {
        messageApi.success("Xóa trang trại cá Koi thành công");
        handleReload();
      } else {
        messageApi.error("Xóa trang trại cá Koi không thành công");
      }
    } catch (error) {
      messageApi.error("Lỗi khi xóa trang trại cá Koi: " + error.message);
    }
  };

  return (
    <>
      {contextHolder}
      <Tooltip title="Xóa">
        <Popconfirm
          title="Bạn chắc chắn muốn xóa trang trại cá Koi này?"
          onConfirm={handleDelete}
          okText="Có"
          cancelText="Không"
        >
          <Button className="ml-5" danger ghost icon={<DeleteOutlined />} />
        </Popconfirm>
      </Tooltip>
    </>
  );
}

export default DeleteKoiFarm;
