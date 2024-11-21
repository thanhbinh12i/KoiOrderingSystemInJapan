import { useSelector, useDispatch } from 'react-redux';
import { Card, List, Button, Spin } from 'antd';
import GoBack from '../GoBack';
import { get } from '../../utils/request';
import { Link, useParams } from 'react-router-dom';
import { fetchCartItems } from '../../redux/actions/cart';
import { useEffect, useState } from 'react';
import CartItem from './CartItem';
import './Cart.scss';


function Cart() {
      const { id: billId } = useParams();
      const dispatch = useDispatch();
      const cartItems = useSelector(state => state.cartReducer.items);
      const [cartWithKoiInfo, setCartWithKoiInfo] = useState([]);

      const totalPrice = cartItems.reduce((sum, item) => {
            if (item.finalPrice > 0) {
                  return sum + item.finalPrice * item.quantity
            } else {
                  return sum + item.originalPrice * item.quantity
            }
      }, 0);

      const allItemsHaveFinalPrice = cartItems.length > 0 && cartItems.every(item => item.finalPrice > 0);

      const [loading, setLoading] = useState(false);

      useEffect(() => {
            const fetchApi = async () => {
                  try {
                        setLoading(true);
                        const cartResponse = await get(`koi-bill/view-by-billId/${billId}`);

                        if (cartResponse) {
                              const cartItemsWithKoi = await Promise.all(
                                    cartResponse.map(async (item) => {
                                          const koiResponse = await get(`koi/view-by-id/${item.koiId}`);
                                          return {
                                                ...item,
                                                koiDetails: koiResponse
                                          };
                                    })
                              );

                              setCartWithKoiInfo(cartItemsWithKoi);
                              dispatch(fetchCartItems(cartResponse));
                        }
                  } catch (error) {
                        console.error('Error fetching cart items:', error);
                  } finally {
                        setLoading(false);
                  }
            };

            fetchApi();
      }, [dispatch, billId]);

      if (loading) {
            return <Spin size="large" />;
      }

      return (
            <>
                  <GoBack />
                  <Card
                        title="Giỏ hàng của tôi"
                        className="card-container"
                        headStyle={{ className: "card-title" }}
                  >
                        <List
                              dataSource={cartWithKoiInfo}
                              renderItem={(item) => (
                                    <List.Item className="list-item">
                                          <CartItem item={item} billId={billId} />
                                    </List.Item>
                              )}
                        />
                        <div className="total-price">
                              Tổng tiền: {totalPrice.toLocaleString()} đ
                        </div>
                        {allItemsHaveFinalPrice ? (
                              <Link to={`/check-out-koi/${billId}`} state={{ totalPrice: totalPrice }}>
                                    <Button type="primary" className="checkout-button">
                                          Thanh toán
                                    </Button>
                              </Link>
                        ) : (
                              <Button type="primary" className="contact-button">
                                    Liên hệ deal Koi với nhân viên
                              </Button>
                        )}
                  </Card>
            </>
      );
}
export default Cart;