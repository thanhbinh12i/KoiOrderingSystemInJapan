export const addToCart = (koi) => ({
      type: 'ADD_TO_CART',
      payload: koi,
});

export const fetchCartItems = (items) => ({
      type: 'FETCH_CART_ITEMS',
      payload: items
});
export const updateQuantity = (id, quantity) => ({
      type: 'UPDATE_QUANTITY',
      id: id,
      quantity: quantity
});
export const removeFromCart = (id) => ({
      type: 'REMOVE_FROM_CART',
      payload: id
});

