import { del } from "../../utils/request";
import { removeFromCart } from "../../redux/actions/cart";
import { useDispatch } from "react-redux";
import { Button, Image, Input } from "antd";
import './CartItem.scss';

function CartItem(props) {
      const { billId, item } = props;
      const dispatch = useDispatch();
      console.log(item)
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
      return (
            <>
                  {item && (
                        <>
                              <div key={item.billId} className="cart-item">
                                    <div className="cart-item__image">

                                          <Image
                                                alt={item.koiName}
                                                src={`${process.env.REACT_APP_API_URL_UPLOAD}koi/${item.koiDetails.koiImages[0]?.urlImage}`}
                                          />
                                    </div>
                                    <h3 className="cart-item__name">Koi {item.koiName}</h3>
                                    {
                                          item.finalPrice > 0 ? (
                                                <p>{item.finalPrice?.toLocaleString()} đ</p>
                                          ) : (
                                                <p>{item.originalPrice?.toLocaleString()} đ</p>
                                          )
                                    }
                                    <div className="cart-item__quantity">
                                          <Input
                                                value={item.quantity}
                                                style={{ width: '150px', textAlign: 'center' }}
                                                readOnly
                                          />
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