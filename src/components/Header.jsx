import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Добавим useNavigate для перехода
import styles from '../assets/css/Header.module.css';
import { images } from './images';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate(); // Хук для навигации
  const isShopPage = location.pathname === '/shop';

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hovering, setHovering] = useState(false); // отслеживает наведение

  // Таймеры для отложенного появления и исчезновения
  useEffect(() => {
    let showTimer, hideTimer;

    // Показ меню через 2 секунды при наведении
    if (hovering) {
      showTimer = setTimeout(() => setIsDropdownOpen(true), 100);
    } else {
      // Скрытие меню через 3 секунды при убирании курсора
      hideTimer = setTimeout(() => setIsDropdownOpen(false), 100);
    }

    // Очистка таймеров при изменении состояния hovering
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [hovering]);

  // Функция перехода на страницу "shop" через 5 секунд
  const handleProductsClick = () => {
    setTimeout(() => {
      navigate('/shop');
    }, 5000); // Переход через 5 секунд
  };

  return (
    <div>
      <header className={`${styles['wrapper-header']} ${isShopPage ? styles['shop-header'] : ''}`}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <a href="#"><img src={images.logo} alt="Logo" /><h1>ARCADE</h1></a>
          </div>
          <div className={styles.headerRight}>
            {/* Наведение на Products вызывает задержку показа меню */}
            <a 
              href="#"
              className={styles['headerRight-href']}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              onClick={handleProductsClick} // Обработчик клика по "Products"
            >
              Products
            </a>
            <a href="#" className={styles['headerRight-href']}>On Sale</a>
            <a href="#" className={styles['headerRight-href']}>Contact Us</a>
            <a href="#" className={styles['headerRight-href']}><img src={images.profileImg} alt="Profile" /></a>
            <a href="#" className={styles['headerRight-href']}><img src={images.shoppingCart} alt="Cart" /></a>
          </div>
        </div>

        {/* Выпадающее меню */}
        {isDropdownOpen && (
          <div 
            className={styles['dropdownMenu']}
            onMouseEnter={() => setHovering(true)}  // при наведении на меню оно не исчезает
            onMouseLeave={() => setHovering(false)} // при убирании курсора запускается таймер
          >
            <a href="/shop?category=BestSellers">Best Sellers</a>
            <a href="/shop?category=Games">Games</a>
            <a href="/shop?category=Consoles">Consoles</a>
            <a href="/shop?category=Accessories">Accessories</a>
          </div>
        )}
      </header>
    </div>
  );
}
