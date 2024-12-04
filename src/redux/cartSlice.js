import { createSlice } from '@reduxjs/toolkit';

const loadCartFromLocalStorage = () => {
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : { items: [] };
  } catch (error) {
    console.error('Error loading cart from localStorage', error);
    return { items: [] };
  }
};

const initialState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push(item);
      }
      localStorage.setItem('cart', JSON.stringify(state)); // Сохраняем корзину в localStorage
    },
    removeItem(state, action) {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(state)); // Сохраняем корзину в localStorage
    },
    decreaseItemQuantity(state, action) {
      const id = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item && item.quantity === 1) {
        state.items = state.items.filter(i => i.id !== id);
      }
      localStorage.setItem('cart', JSON.stringify(state)); // Сохраняем корзину в localStorage
    },
  },
});

export const { addItem, removeItem, decreaseItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
