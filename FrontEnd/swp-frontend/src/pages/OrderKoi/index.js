import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { get, post } from "../../utils/request";
import { Button, Card, Col, Row } from "antd";
import { useDispatch } from "react-redux";
import { addToCart } from "../../actions/cart";
import { ShoppingCartOutlined } from "@ant-design/icons";

function OrderKoi() {
  const location = useLocation();
  const params = useParams();
  const { tourId } = location.state || params;
  const [koiByFarm, setKoiByFarm] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchApi = async () => {
      if (tourId) {
        const response = await get(`tourDestination/view-tourId/${tourId}`);
        if (response) {
          const farmIdList = response.map((dest) => dest.farmId);
          const koiPromises = farmIdList.map(async (farmId) => {
            const koiResponse = await get(`koi/view-by-farmId/${farmId}`);
            return { farmId, kois: koiResponse };
          });

                              const koiData = await Promise.all(koiPromises);
                              setKoiByFarm(koiData);
                        }
                  }
            }
            fetchApi();
      }, [tourId]);
      const handleAddToCart = async (koi) => {
            const data = {
                  "originalPrice": koi.price,
                  "quantity": 1,
                  "finalPrice": 0
            }
            const response = await post(`koi-bill/create/${params.id}-${koi.koiId}`, data);
            if (response) {
                  dispatch(addToCart({ ...koi, quantity: 1 }));
            }
      }
      return (
            <div className="order-koi-container">
                  <Link to="cart">
                        <Button icon={<ShoppingCartOutlined />}></Button>
                  </Link>
                  <Row gutter={20}>
                        {koiByFarm.flatMap((farm, farmIndex) =>
                              farm.kois.map((koi, koiIndex) => (
                                    <Col span={6}>
                                          <Card key={`${farmIndex}-${koiIndex}`} hoverable>
                                                {koi.koiImages && koi.koiImages.length > 0 ? (
                                                      <img
                                                            key={0}
                                                            width="100%"
                                                            height={300}
                                                            alt={koi.koiName}
                                                  src={`https://koidayne.azurewebsites.net/uploads/koi/${koi.koiImages[0].urlImage}`}
                                                      />
                                                ) : (
                                                      <p>No images available</p>
                                                )}
                                                <Card.Meta
                                                      title={koi.koiName}
                                                      description={
                                                            <>
                                                                  <p>Price: {koi.price}</p>
                                                                  <p>Length: {koi.length} cm</p>
                                                                  <p>Year of Birth: {koi.yob}</p>
                                                                  <p>Gender: {koi.gender}</p>
                                                            </>
                                                      }
                                                />
                                                <Button
                                                      type="primary"
                                                      onClick={() => handleAddToCart(koi)}
                                                      style={{ width: '100%', marginTop: '10px' }}
                                                >
                                                      Đặt hàng
                                                </Button>
                                          </Card>
                                    </Col>
                              ))
                        )}
                  </Row>

            </div>
      );
}
export default OrderKoi;
