import { useSelector, useDispatch } from 'react-redux';
import { Card, List, Button, InputNumber } from 'antd';

function Cart() {
      const dispatch = useDispatch();
      const cartItems = useSelector(state => state.cartReducer.items);
      const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return (
            <>
                  <Card title="Your Cart">
                        <List
                              dataSource={cartItems}
                              renderItem={item => (
                                    <List.Item>
                                          <List.Item.Meta
                                                title={item.koiName}
                                                description={
                                                      <>
                                                            <p>Price: ${item.price}</p>
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
                              <strong>Total: ${totalPrice.toFixed(2)}</strong>
                        </div>
                        <Button type="primary" style={{ marginTop: 16 }} block>
                              Checkout
                        </Button>
                  </Card>
            </>
      )
}
export default Cart;