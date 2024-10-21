import { Form, Input, Select, DatePicker, Button, Row, Col } from 'antd';
import './SearchTour.scss';
import { useEffect, useState } from 'react';
import { get } from '../../utils/request';
import { useNavigate } from 'react-router-dom';

const { RangePicker } = DatePicker;
const { Option } = Select;

function SearchTour() {
      const [varieties, setVarieties] = useState([]);
      const [farms, setFarms] = useState([]);
      const navigate = useNavigate();
      useEffect(() => {
            const fetchApi = async () => {
                  const response = await get("koi-variable/view-all");
                  if (response) {
                        const formattedVarieties = response.map(item => ({
                              label: item.varietyName,
                              value: item.varietyId
                        }));
                        setVarieties(formattedVarieties);
                  }
            }
            fetchApi();
      }, [])
      useEffect(() => {
            const fetchApi = async () => {
                  const response = await get("koiFarm/view-all");
                  if (response) {
                        const formattedFarm = response.map(item => ({
                              label: item.farmName,
                              value: item.farmId
                        }));
                        setFarms(formattedFarm);
                  }
            }
            fetchApi();
      }, [])
      const handleSearch = async (values) => {
            const queryParams = new URLSearchParams();
            if (values.farm) queryParams.append('farm', values.farm);
            if (values.variety) queryParams.append('variety', values.variety);
            if (values.priceMin) queryParams.append('priceMin', values.priceMin);
            if (values.priceMax) queryParams.append('priceMax', values.priceMax);
            navigate(`/search-results?${queryParams.toString()}`);
      }
      return (
            <>
                  <div className='search-form-container'>
                        <h1>Tìm kiếm Tour</h1>
                        <Form className="search-form" layout="vertical" onFinish={handleSearch}>
                              <Row gutter={16}>
                                    <Col span={24}>
                                          <Form.Item label="Trang trại" name="farm">
                                                <Select placeholder="Chọn trang trại">
                                                      {farms.map(farm => (
                                                            <Option key={farm.value} value={farm.value}>
                                                                  {farm.label}
                                                            </Option>
                                                      ))}
                                                </Select>
                                          </Form.Item>
                                    </Col>

                                    <Col span={8}>
                                          <Form.Item label="Giống cá Koi" name="variety">
                                                <Select placeholder="Chọn giống cá Koi">
                                                      {varieties.map(variety => (
                                                            <Option key={variety.value} value={variety.value}>
                                                                  {variety.label}
                                                            </Option>
                                                      ))}
                                                </Select>
                                          </Form.Item>
                                    </Col>

                                    <Col span={8}>
                                          <Form.Item label="Khoảng giá (VNĐ)">
                                                <Input.Group compact>
                                                      <Form.Item name="priceMin" noStyle>
                                                            <Input style={{ width: '50%' }} placeholder="Giá thấp nhất" />
                                                      </Form.Item>
                                                      <Form.Item name="priceMax" noStyle>
                                                            <Input style={{ width: '50%' }} placeholder="Giá cao nhất" />
                                                      </Form.Item>
                                                </Input.Group>
                                          </Form.Item>
                                    </Col>

                                    <Col span={8}>
                                          <Form.Item label="Thời gian" name="time">
                                                <RangePicker />
                                          </Form.Item>
                                    </Col>
                              </Row>

                              <Form.Item style={{ marginBottom: 0 }}>
                                    <Button type="primary" htmlType="submit" className="search-button">
                                          Tìm kiếm
                                    </Button>
                              </Form.Item>
                        </Form>
                  </div>
            </>
      )
}
export default SearchTour;