

const initialState = {
  items: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CART_ITEMS':
      return {
        ...state,
        items: action.payload
      };
    case "ADD_TO_CART":
      const existingItem = state.items.find(item => item.koiId === action.payload.koiId);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.koiId === action.payload.koiId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.koiId === action.id ? { ...item, quantity: action.quantity } : item
        )
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.koiId !== action.payload)
      };
    default:
      return state;
  }
};