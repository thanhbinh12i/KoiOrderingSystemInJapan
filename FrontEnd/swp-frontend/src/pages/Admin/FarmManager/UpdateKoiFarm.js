import { Button, Popconfirm, Tooltip, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
function UpdateKoiFarm() {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <>
      {contextHolder}
      <Tooltip title="Xóa">
        <Popconfirm
          title="Bạn chắc chắn muốn cập nhập trang trại cá Koi này?"
          //   onConfirm={handleDelete}
          okText="Có"
          cancelText="Không"
        >
          <Button
            className="ml-5 friendly-blue-button"
            icon={<EditOutlined />}
          ></Button>
        </Popconfirm>
      </Tooltip>
    </>
  );
}

export default UpdateKoiFarm;
