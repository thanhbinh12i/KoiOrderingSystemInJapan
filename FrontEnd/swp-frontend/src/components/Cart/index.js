import { useSelector, useDispatch } from 'react-redux';
import { Card, List, Button, Spin } from 'antd';
import GoBack from '../GoBack';
import { get } from '../../utils/request';
import { useParams } from 'react-router-dom';
import { fetchCartItems} from '../../actions/cart';
import { useEffect, useState } from 'react';
import CartItem from './CartItem';


function Cart() {
      const { id: billId } = useParams();
      const dispatch = useDispatch();
      const cartItems = useSelector(state => state.cartReducer.items);
      const totalPrice = cartItems.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
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
                  <Card title="Your Cart">
                        <List
                              dataSource={cartItems}
                              renderItem={(item) => (
                                    <List.Item>
                                          <CartItem item={item} billId={billId}/>
                                    </List.Item>
                              )}
                        />
                        <div style={{ marginTop: 16 }}>
                              <strong>Total: {totalPrice} đ</strong>
                        </div>
                        <Button type="primary" style={{ marginTop: 16 }} block>
                              Checkout
                        </Button>
                  </Card>
            </>
      )
}
export default Cart;