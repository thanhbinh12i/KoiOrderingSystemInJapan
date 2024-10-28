import React, { useEffect, useState } from "react";
import { Table, Image, Typography } from "antd";
import { get } from "../../../utils/request";

const { Text } = Typography;

function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchApi = async () => {
    const response = await get("feedback/view-all");
    if (response) {
      const updated = await Promise.all(
        response.map(async (fb) => {
          const userName = await get(`account/${fb.userId}`);
          return { ...fb, userName: userName.userName };
        })
      );
      if (updated) {
        setFeedbacks(updated);
      }
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);
  const columns = [
    {
      title: "ID",
      dataIndex: "feedbackId",
      key: "feedbackId",
    },
    {
      title: "Đánh giá",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Comment",
      key: "content",
      dataIndex: "content",
    },
    {
      title: "User ID",
      key: "userId",
      dataIndex: "userId",
    },
    {
      title: "Tên người đánh giá",
      key: "userName",
      dataIndex: "userName",
    },
  ];

  return (
    <div className="feedback">
      <Table
        columns={columns}
        dataSource={feedbacks}
        rowKey="feedbackId"
        bordered
        expandable={{
          expandedRowRender: (record) => (
            <div style={{ margin: 0 }}>
              <Text strong>Hình ảnh:</Text>
              <br />
              {record.urlImage ? (
                <Image
                  width={200}
                  src={`${process.env.REACT_APP_API_URL_UPLOAD}feedback/${record.urlImage}`}
                  alt="Feedback image"
                />
              ) : (
                <Text italic>Không có hình ảnh</Text>
              )}
            </div>
          ),
        }}
      />
    </div>
  );
}

export default FeedbackList;
