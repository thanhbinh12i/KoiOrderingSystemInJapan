import React, { useState, useEffect } from "react";
import { Card, Row, Col, Typography, Pagination, Spin } from "antd";
import "./Koi.scss";
import { get } from "../../utils/request";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import SearchKoi from "../../components/SearchKoi";

const { Title } = Typography;

function Koi() {
  const [koi, setKoi] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 16;

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    return koi.slice(startIndex, startIndex + pageSize);
  };

  useEffect(() => {
    const fetchAPI = async () => {
      setLoading(true);
      try {
        const response = await get(`koi/view-all`);
        // const updatedKoiData = await Promise.all(
        //   response.items.map(async (koi) => {
        //     const farmResponse = await get(`koiFarm/view/${koi.farmId}`);
        //     return { ...koi, farmName: farmResponse.farmName };
        //   })
        // );
        setKoi(response);
      } catch (error) {
        console.error("Error fetching Koi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAPI();
  }, [currentPage]);

  return (
    <>
      <SearchKoi />
      {loading ? (
        <Spin tip="Loading..." />
      ) : (
        <>
          <Row gutter={[16, 16]} className="koi-container">
            {getCurrentPageData().map((koi) => (
              <Col xs={24} sm={12} md={6} key={koi.koiId}>
                <Link to={`/kois/${koi.koiId}`} className="koi-link">
                  <Card hoverable className="koi-card">
                    <img
                      width={135}
                      height={200}
                      alt={koi?.koiName || "Default Alt Text"}
                      src={`${process.env.REACT_APP_API_URL_UPLOAD}koi/${koi.koiImages[0].urlImage}`}
                      className="koi-image"
                      loading="lazy"
                    />
                    <Title level={5}>{koi.koiName}</Title>
                    <Title level={5}>Giá: {koi.price}</Title>
                    <Title level={5}>Ngày sinh: {koi.yob}</Title>
                    <Title level={5}>Giới tính: {koi.gender}</Title>
                    <Title level={5}>
                      Ngày đăng: {dayjs(koi.updateDate).format("DD-MM-YYYY")}
                    </Title>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              current={currentPage}
              onChange={(page) => setCurrentPage(page)}
              total={koi.length}
              pageSize={pageSize}
              showSizeChanger={false}
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} của ${total} mục`
              }
            />
          </div>
        </>
      )}
    </>
  );
}

export default Koi;
