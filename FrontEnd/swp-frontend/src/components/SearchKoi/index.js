import { Form, Input, Select, Button, Row, Col } from "antd";
import "./SearchKoi.scss";
import { useEffect, useState } from "react";
import { get } from "../../utils/request";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
function SearchKoi() {
  const [varieties, setVarieties] = useState([]);
  const [farms, setFarms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVarieties = async () => {
      const response = await get("koi-variable/view-all");
      if (response) {
        const formattedVarieties = response.map((item) => ({
          label: item.varietyName,
          value: item.varietyId,
        }));
        setVarieties(formattedVarieties);
      }
    };
    fetchVarieties();
  }, []);

  useEffect(() => {
    const fetchFarms = async () => {
      const response = await get("koiFarm/view-all");
      if (response) {
        const formattedFarm = response.map((item) => ({
          label: item.farmName,
          value: item.farmId,
        }));

        setFarms(formattedFarm);
      }
    };
    fetchFarms();
  }, []);

  const handleSearch = async (values) => {
    const queryParams = new URLSearchParams();
    if (values.farm) queryParams.append("farm", values.farm);
    if (values.variety) queryParams.append("variety", values.variety);
    if (values.priceMin) queryParams.append("priceMin", values.priceMin);
    if (values.priceMax) queryParams.append("priceMax", values.priceMax);

    navigate(`/search-koi-results?${queryParams.toString()}`);
  };

  return (
    <>
      <div className="search-form-container">
        <h1>Tìm kiếm Cá Koi</h1>
        <Form className="search-form" layout="vertical" onFinish={handleSearch}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Trang trại" name="farm">
                <Select placeholder="Chọn trang trại">
                  {farms.map((farm) => (
                    <Option key={farm.value} value={farm.value}>
                      {farm.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Giống cá Koi" name="variety">
                <Select placeholder="Chọn giống cá Koi">
                  {varieties.map((variety) => (
                    <Option key={variety.value} value={variety.value}>
                      {variety.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Khoảng giá (VNĐ)">
                <Input.Group compact>
                  <Form.Item name="priceMin" noStyle>
                    <Input
                      style={{ width: "50%" }}
                      placeholder="Giá thấp nhất"
                      type="number"
                    />
                  </Form.Item>
                  <Form.Item name="priceMax" noStyle>
                    <Input
                      style={{ width: "50%" }}
                      placeholder="Giá cao nhất"
                      type="number"
                    />
                  </Form.Item>
                </Input.Group>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ marginBottom: 0, textAlign: "center" }}>
            <Button type="primary" htmlType="submit" className="search-button">
              Tìm kiếm
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
export default SearchKoi;
