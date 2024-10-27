import { useState } from "react";
import { del, put } from "../../utils/request";
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
      const handleUp = async () => {
            const newQuantity = quantity + 1;
            setQuantity(newQuantity);
            const dataToUpdate = {
                  "originalPrice": item.originalPrice,
                  "quantity": newQuantity,
                  "finalPrice": item.finalPrice
            }
            const response = await put(`koi-bill/update/${billId}-${item.koiId}`, dataToUpdate);
            if (response) {
                  dispatch(updateQuantity(item.koiId, newQuantity));
            }
      }
      const handleDown = async () => {
            if (quantity > 1) {
                  const newQuantity = quantity - 1;
                  setQuantity(newQuantity);
                  const dataToUpdate = {
                        "originalPrice": item.originalPrice,
                        "quantity": newQuantity,
                        "finalPrice": item.finalPrice
                  }
                  const response = await put(`koi-bill/update/${billId}-${item.koiId}`, dataToUpdate);
                  if (response) {
                        dispatch(updateQuantity(item.koiId, newQuantity));
                  }
            }
      }
      return (
            <>
                  {item && (
                        <>
                              <div key={item.billId}>
                                    <h3>Koi {item.koiName}</h3>
                                    {
                                          item.finalPrice > 0 ? (
                                                <p>Giá tiền: {item.finalPrice} đ</p>
                                          ) : (
                                                <p>Giá tiền: {item.originalPrice} đ</p>
                                          )
                                    }
                                    <div className="cart__quantity">
                                          <Button onClick={handleDown}>-</Button>
                                          <Input
                                                value={item.quantity}
                                                style={{ width: '150px', textAlign: 'center' }}
                                                readOnly
                                          />
                                          <Button onClick={handleUp}>+</Button>
                                    </div>

                                    <Button type="link" onClick={() => handleRemoveItem(item.koiId)}>
                                          Xóa khỏi giỏ hàng
                                    </Button>
                              </div>
                        </>
                  )}
            </>
      )
}
export default CartItem;