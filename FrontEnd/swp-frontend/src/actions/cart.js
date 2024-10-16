export const addToCart = (koi) => ({
      type: 'ADD_TO_CART',
      payload: koi,
});

export const fetchCartItems = (items) => ({
      type: 'FETCH_CART_ITEMS',
      payload: items
});
