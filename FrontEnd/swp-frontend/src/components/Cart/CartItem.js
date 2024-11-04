import { useState } from "react";
import { del, get, put } from "../../utils/request";
import { removeFromCart, updateQuantity } from "../../redux/actions/cart";
import { useDispatch } from "react-redux";
import { Button, Input } from "antd";
import Swal from "sweetalert2";

function CartItem(props) {
      const { billId, item } = props;
      const dispatch = useDispatch();
      const [quantity, setQuantity] = useState(item.quantity);
      const handleRemoveItem = async (item) => {
            const action = "CancelOrder";
            const response = await del(`koi-bill/delete`, `${billId}-${item.koiId}`);
            if (response) {
                  await fetch(`${process.env.REACT_APP_API_URL}koi/handle-quantity?KoiId=${item.koiId}&quantityRequested=${item.quantity}&action=${action}`, {
                        method: 'POST',
                  });
                  dispatch(removeFromCart(item.koiId));
            }
      };
      const handleUp = async () => {
            const response = await get(`koi/view-by-id/${item.koiId}`);
            if (response.quantity > 0) {
                  const newQuantity = quantity + 1;
                  setQuantity(newQuantity);
                  const dataToUpdate = {
                        "originalPrice": item.originalPrice,
                        "quantity": newQuantity,
                        "finalPrice": item.finalPrice
                  }
                  const action = "addToCart";
                  const response = await put(`koi-bill/update/${billId}-${item.koiId}`, dataToUpdate);
                  if (response) {
                        await fetch(`${process.env.REACT_APP_API_URL}koi/handle-quantity?KoiId=${item.koiId}&quantityRequested=${1}&action=${action}`, {
                              method: 'POST',
                        });
                        dispatch(updateQuantity(item.koiId, newQuantity));
                  }
            } else {
                  Swal.fire({
                        icon: "error",
                        title: "Không đủ số lượng!!!",
                  });
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
                  const action = "CancelOrder";
                  const response = await put(`koi-bill/update/${billId}-${item.koiId}`, dataToUpdate);
                  if (response) {
                        await fetch(`${process.env.REACT_APP_API_URL}koi/handle-quantity?KoiId=${item.koiId}&quantityRequested=${1}&action=${action}`, {
                              method: 'POST',
                        });
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

                                    <Button type="link" onClick={() => handleRemoveItem(item)}>
                                          Xóa khỏi giỏ hàng
                                    </Button>
                              </div>
                        </>
                  )}
            </>
      )
}
export default CartItem;