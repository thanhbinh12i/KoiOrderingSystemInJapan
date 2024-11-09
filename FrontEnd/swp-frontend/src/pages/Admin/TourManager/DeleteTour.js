import React from "react";
import { Button, Popconfirm, Tooltip, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { del } from "../../../utils/request";

function DeleteTour({ record, handleReload }) {
  const [messageApi, contextHolder] = message.useMessage();

  const handleDelete = async () => {
    try {
      const response = await del(`tour/delete`, record.tourId);
      if (response) {
        messageApi.success("Xóa tour thành công");
        handleReload();
      } else {
        messageApi.error("Xóa tour không thành công");
      }
    } catch (error) {
      messageApi.error("Lỗi khi xóa tour: " + error.message);
    }
  };

  return (
    <>
      {contextHolder}
      <Tooltip title="Xóa">
        <Popconfirm
          title="Bạn chắc chắn muốn xóa tour này?"
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

export default DeleteTour;
