import { useState } from "react";
import { del } from "../../utils/request";
import { removeFromCart, updateQuantity } from "../../actions/cart";
import { useDispatch } from "react-redux";
import { Button, Input } from "antd";

function CartItem(props) {
      const { billId, item } = props;
      const dispatch = useDispatch();
      const [quantity, setQuantity] = useState(item.quantity);
      const handleRemoveItem = async (id) => {
            const response = await del(`koi-bill/delete`, `${billId}-${id}`);
            if (response) {
                  dispatch(removeFromCart(id));
            }
      };
      const handleUp = () => {
            const newQuantity = quantity + 1;
            setQuantity(newQuantity);
            dispatch(updateQuantity(item.id, newQuantity));
      }
      const handleDown = () => {
            if (quantity > 1) {
                  const newQuantity = quantity - 1;
                  setQuantity(newQuantity);
                  dispatch(updateQuantity(item.id, newQuantity));
            }
      }
      return (
            <>
                  {item && (
                        <>
                              <div key={item.id}>
                                    <h3>{item.koiName}</h3>
                                    <p>Price: {item.originalPrice} đ</p>
                                    <div className="cart__quantity">
                                          <Button onClick={handleDown}>-</Button>
                                          <Input
                                                value={quantity}
                                                style={{ width: '150px', textAlign: 'center' }}
                                                readOnly
                                          />
                                          <Button onClick={handleUp}>+</Button>
                                    </div>

                                    <Button type="link" onClick={() => handleRemoveItem(item.koiId)}>
                                          Remove
                                    </Button>
                              </div>
                        </>
                  )}
            </>
      )
}
export default CartItem;