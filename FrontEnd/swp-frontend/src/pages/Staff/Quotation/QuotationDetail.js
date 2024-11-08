import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Descriptions, Typography, Space, Divider, List, Button, Modal, DatePicker } from "antd";
import { ClockCircleOutlined, UserOutlined, GlobalOutlined, EnvironmentOutlined, } from "@ant-design/icons";
import { get, put } from "../../../utils/request";
import GoBack from "../../../components/GoBack";
import moment from "moment";
const { Title, Text } = Typography;

function QuotationDetail() {
      const params = useParams();
      const [tour, setTour] = useState(null);
      const [farm, setFarm] = useState([]);
      const [modalVisible, setModalVisible] = useState(false);
      const [newDate, setNewDate] = useState(null);
      const disablePastDates = (current) => {
            return current && current <= moment(tour.startTime).startOf('day');
      };
      const showModal = () => {
            setModalVisible(true);
      };

      const handleCancel = () => {
            setModalVisible(false);
      };
      useEffect(() => {
            const fetchApi = async () => {
                  const response = await get(`tour/view-tourId/${params.id}`);
                  if (response) {
                        setTour(response);
                  }
            };
            fetchApi();
      }, [params.id]);
      useEffect(() => {
            const fetchApi = async () => {
                  const response = await get(`tourDestination/view-tourId/${params.id}`);
                  if (response) {
                        const responseFarms = await Promise.all(
                              response.map((item) => get(`koiFarm/view/${item.farmId}`))
                        );

                        if (responseFarms) {
                              setFarm(responseFarms);
                        }
                  }
            };
            fetchApi();
      }, [params.id]);
      const handleOk = async () => {
            if (newDate) {
                  const data = {
                        ...tour,
                        "finishTime": newDate.format('DD-MM-YYYY')
                  }
                  const response = await put(`tour/update/${params.id}`, data);
                  if (response) {
                        setTour(data);
                        setModalVisible(false);
                        setNewDate(null);
                  }
            }
      }
      return (
            <>
                  <GoBack />
                  {tour && (
                        <>
                              <Card className="tour-info-card">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                          <Title level={2}>{tour.tourName}</Title>
                                          {tour.price === 0 && (
                                                <Button type="primary" onClick={() => showModal()}>Cập nhật ngày trở về</Button>
                                          )}
                                          <Modal
                                                title="Cập nhật ngày giao hàng"
                                                visible={modalVisible}
                                                onOk={handleOk}
                                                onCancel={handleCancel}
                                          >
                                                <>
                                                      <p>Nhập ngày kết thúc: </p>
                                                      <DatePicker onChange={(date) => setNewDate(date)} format="DD-MM-YYYY" disabledDate={disablePastDates} />
                                                </>
                                          </Modal>
                                    </div>

                                    <Divider />
                                    <Space direction="vertical" size="large" style={{ width: "100%" }}>
                                          <Descriptions column={1} labelStyle={{ fontWeight: "bold" }}>
                                                <Descriptions.Item
                                                      label={
                                                            <Space>
                                                                  <ClockCircleOutlined /> Ngày đi
                                                            </Space>
                                                      }
                                                >
                                                      {tour.startTime}
                                                </Descriptions.Item>
                                                <Descriptions.Item
                                                      label={
                                                            <Space>
                                                                  <ClockCircleOutlined /> Ngày về
                                                            </Space>
                                                      }
                                                >
                                                      {tour.finishTime}
                                                </Descriptions.Item>
                                                <Descriptions.Item
                                                      label={
                                                            <Space>
                                                                  <UserOutlined /> Số lượng người tham gia
                                                            </Space>
                                                      }
                                                >
                                                      {tour.numberOfParticipate}
                                                </Descriptions.Item>
                                          </Descriptions>

                                          <div className="farm-section">
                                                <h4>
                                                      <GlobalOutlined /> Các trang trại tham quan trong chuyến đi:
                                                </h4>
                                                <List
                                                      dataSource={farm}
                                                      itemLayout="vertical"
                                                      renderItem={(item) => (
                                                            <List.Item key={item.farmName} className="farm-list-item">
                                                                  <div className="farm-container">
                                                                        <img
                                                                              src={`${process.env.REACT_APP_API_URL_UPLOAD}koiFarm/${item.farmImages[0].urlImage}`}
                                                                              alt={item.farmName}
                                                                              className="farm-image"
                                                                        />
                                                                        <div className="farm-info">
                                                                              <Title level={4} className="farm-name">
                                                                                    {item.farmName}
                                                                              </Title>
                                                                              <Text className="farm-location">
                                                                                    <EnvironmentOutlined className="location-icon" />{" "}
                                                                                    {item.location}
                                                                              </Text>
                                                                        </div>
                                                                  </div>
                                                            </List.Item>
                                                      )}
                                                />
                                          </div>

                                          <Divider />
                                    </Space>
                              </Card>
                        </>
                  )}
            </>
      )
}
export default QuotationDetail;