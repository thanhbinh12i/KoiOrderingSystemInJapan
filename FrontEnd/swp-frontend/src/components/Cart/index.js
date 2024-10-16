import { useSelector, useDispatch } from 'react-redux';
import { Card, List, Button, InputNumber, Spin } from 'antd';
import GoBack from '../GoBack';
import { get } from '../../utils/request';
import { useParams } from 'react-router-dom';
import { fetchCartItems } from '../../actions/cart';
import { useEffect, useState } from 'react';

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
                        const response = await get(`koi-bill/view-all`);
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
                              renderItem={item => (
                                    <List.Item>
                                          <List.Item.Meta
                                                title={item.koiName}
                                                description={
                                                      <>
                                                            <p>Price: {item.originalPrice.toLocaleString()} đ</p>
                                                            <InputNumber
                                                                  min={1}
                                                                  value={item.quantity}
                                                            />
                                                            <Button type="link">Remove</Button>
                                                      </>
                                                }
                                          />
                                    </List.Item>
                              )}
                        />
                        <div style={{ marginTop: 16 }}>
                              <strong>Total: {totalPrice.toLocaleString()} đ</strong>
                        </div>
                        <Button type="primary" style={{ marginTop: 16 }} block>
                              Checkout
                        </Button>
                  </Card>
            </>
      )
}
export default Cart;