import { useSelector, useDispatch } from 'react-redux';
import { Card, List, Button, Spin } from 'antd';
import GoBack from '../GoBack';
import { get } from '../../utils/request';
import { Link, useParams } from 'react-router-dom';
import { fetchCartItems } from '../../actions/cart';
import { useEffect, useState } from 'react';
import CartItem from './CartItem';


function Cart() {
      const { id: billId } = useParams();
      const dispatch = useDispatch();
      const cartItems = useSelector(state => state.cartReducer.items);
      const totalPrice = cartItems.reduce((sum, item) => {
            if (item.finalPrice > 0) {
                  return sum + item.finalPrice * item.quantity
            } else {
                  return sum + item.originalPrice * item.quantity
            }
      }, 0);
      const [loading, setLoading] = useState(false);
      useEffect(() => {
            const fetchCart = async () => {
                  try {
                        setLoading(true);
                        const response = await get(`koi-bill/view-by-billId/${billId}`);
                        if (response) {
                              dispatch(fetchCartItems(response));
                        }

                  } catch (error) {
                        console.error('Error fetching cart items:', error);
                  } finally {
                        setLoading(false);
                  }
            };

            fetchCart();
      }, [dispatch, billId]);
      if (loading) {
            return <Spin size="large" />;
      }
      return (
            <>
                  <GoBack />
                  <Card title="Giỏ hàng của tôi">
                        <List
                              dataSource={cartItems}
                              renderItem={(item) => (
                                    <List.Item>
                                          <CartItem item={item} billId={billId} />
                                    </List.Item>
                              )}
                        />
                        <div style={{ marginTop: 16 }}>
                              <strong>Tổng tiền: {totalPrice} đ</strong>
                        </div>
                        <Link to={`/check-out-koi/${billId}`} state={{totalPrice: totalPrice}}>
                              <Button type="primary" style={{ marginTop: 16 }} block>
                                    Thanh toán
                              </Button>
                        </Link>

                  </Card>
            </>
      )
}
export default Cart;