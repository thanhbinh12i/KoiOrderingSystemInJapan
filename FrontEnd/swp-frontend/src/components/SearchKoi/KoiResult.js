import React, { useState, useEffect } from "react";
import { Card, Row, Col, Typography, Pagination, Spin } from "antd";
import { useLocation } from "react-router-dom";
import { get } from "../../utils/request";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import GoBack from "../GoBack";

const { Title } = Typography;
function KoiResult() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 16;
  const location = useLocation();
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    return searchResults.slice(startIndex, startIndex + pageSize);
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams(location.search);
        const farm = queryParams.get("farm");
        const variety = queryParams.get("variety");
        const priceMin = queryParams.get("priceMin");
        const priceMax = queryParams.get("priceMax");
        let results = [];

        if (farm) {
          const responseFarm = await get(`koi/view-by-farmId/${farm}`);
          if (responseFarm) results = responseFarm;
        }

        if (variety && results.length > 0) {
          const responseVariety = await get(
            `koi/view-by-variety-id/${variety}`
          );
          console.log(responseVariety);
          if (responseVariety) {
            results = results.filter((item) =>
              responseVariety.some((koi) => koi.koiId === item.koiId)
            );
          } else {
            results = [];
          }
        }

        const minPrice = priceMin ?? 0;
        const maxPrice = priceMax ?? 9999999999;

        if (maxPrice && results.length > 0) {
          const priceResponse = await get(
            `koi/view-by-price/${minPrice}-${maxPrice}`
          );

          if (priceResponse && priceResponse.length > 0) {
            results = results.filter((item) =>
              priceResponse.some((priceItem) => priceItem.koiId === item.koiId)
            );
          } else {
            results = [];
          }
        }

        const uniqueResults = Array.from(
          new Set(results.map((koi) => koi.koiId))
        ).map((id) => results.find((koi) => koi.koiId === id));

        setSearchResults(uniqueResults);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [location.search]);

  return (
    <>
      <div className="koi-result-container">
        <GoBack />
        <h1>Kết quả tìm kiếm cá Koi</h1>
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
            {searchResults.length > 0 ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Pagination
                  current={currentPage}
                  onChange={(page) => setCurrentPage(page)}
                  total={searchResults.length}
                  pageSize={pageSize}
                  showSizeChanger={false}
                  showTotal={(total, range) =>
                    `${range[0]}-${range[1]} của ${total} mục`
                  }
                />
              </div>
            ) : (
              <div style={{ textAlign: "center", margin: "2rem 0" }}>
                <h2>Không tìm thấy kết quả phù hợp</h2>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
export default KoiResult;
