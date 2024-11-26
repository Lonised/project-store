import React, { useState } from 'react';
import styles from '../assets/css/Sidebar.module.css';
import { images } from '../components/images.js';

export default function Sidebar({ onClose, isOpen }) {
  // Состояние для количества товаров
  const [quantity, setQuantity] = useState(1); 

  // Обработчик изменения количества
  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= 10) {
      setQuantity(value);
    }
  };

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles['sidebarUp']}>
        <button className={styles.closeButton} onClick={onClose}>-</button>
        <h1>Cart</h1>
      </div>
      <div className={styles['sidebarMiddle']}>
        <div className={styles['sidebarMiddleForm']}>
          <img src={images.Games} alt="Product" />
          <div className={styles['formCol']}>
            <p>Kira and the Fading Islands</p>
            <p>18000 ₸</p>
            <div className={styles['productInput']}>
              <p>Quantity of goods :</p>
              <input
                type="number"
                value={quantity} // Привязка значения к состоянию
                onChange={handleQuantityChange} // Обработчик изменения
                min="1"
                max="10" // Задаем ограничение на количество
              />
            </div>
          </div>
        </div>
        <div className={styles['sidebarMiddleForm']}>
          <img src={images.Games} alt="Product" />
          <div className={styles['formCol']}>
            <p>Kira and the Fading Islands</p>
            <p>18000 ₸</p>
            <div className={styles['productInput']}>
              <p>Quantity of goods :</p>
              <input
                type="number"
                value={quantity} // Привязка значения к состоянию
                onChange={handleQuantityChange} // Обработчик изменения
                min="1"
                max="10" // Задаем ограничение на количество
              />
            </div>
          </div>
        </div>
        
      </div>
      <div className={styles['sidebarDown']}>
        <div className={styles['sidebar-line']}></div>
        <button className={styles['buttonSidebar']}>View Cart</button>
      </div>
    </div>
  );
}
