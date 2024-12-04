import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, decreaseItemQuantity, addItem } from '../redux/cartSlice';
import styles from '../assets/css/Sidebar.module.css';
import { Link } from 'react-router-dom';

export default function Sidebar({ onClose, isOpen, onOpen }) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [totalAmount, setTotalAmount] = useState(0);
  const [animate, setAnimate] = useState(false);

  // Сохранение корзины в localStorage при изменении cartItems
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify({ items: cartItems }));
    
    // Вычисление новой суммы
    const newTotalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    setTotalAmount(newTotalAmount);
    
    // Включаем анимацию при изменении суммы
    setAnimate(true);

    // Сбрасываем анимацию через 600ms, чтобы она могла сработать снова
    const timeout = setTimeout(() => {
      setAnimate(false);
    }, 600); // Длительность анимации

    return () => clearTimeout(timeout); // Очистка таймера при размонтировании
  }, [cartItems]);

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= 10) {
      setQuantity(value);
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image
    }));
    onOpen(); // Открыть сайдбар при добавлении товара
  };

  const handleDecrease = (id) => {
    dispatch(decreaseItemQuantity(id));
  };

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles['sidebarUp']}>
        <button className={styles.closeButton} onClick={onClose}>-</button>
        <h1>Cart</h1>
      </div>
      <div className={styles['sidebarMiddle']}>
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <div key={item.id} className={styles['sidebarMiddleForm']}>
              <img src={item.image} alt="Product" />
              <div className={styles['formCol']}>
                <p>{item.name}</p>
                <p>{item.price} ₸</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div className={styles['sidebarMiddleButton']}>
                <button onClick={() => handleDecrease(item.id)}>-</button>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
      <div className={`${styles['totalAmount']} ${animate ? styles.animate : ''}`}>
        <p>Total: {totalAmount} ₸</p>
      </div>
      <div className={styles['sidebarDown']}>
        <div className={styles['sidebar-line']}></div>
        <Link to="/shop/cart">
          <button className={styles['buttonSidebar']}>View Cart</button>
        </Link>
      </div>
    </div>
  );
}
