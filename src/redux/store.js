import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice'; // Импорт вашего cartSlice

export const store = configureStore({
  reducer: {
    cart: cartSlice, // Добавляем ваш slice в редюсер
  },
});

export default store; // Если вам нужно использовать default export
