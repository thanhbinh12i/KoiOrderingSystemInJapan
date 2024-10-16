

const initialState = {
  items: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};