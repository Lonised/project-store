import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../assets/css/Header.module.css';
import { images } from './images';
import Sidebar from './Sidebar';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isShopPage = location.pathname === '/shop';

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    let timer;
    if (hovering) {
      timer = setTimeout(() => setIsDropdownOpen(true), 100);
    } else {
      timer = setTimeout(() => setIsDropdownOpen(false), 300);
    }
    return () => clearTimeout(timer);
  }, [hovering]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div>
      <header className={`${styles['wrapper-header']} ${isShopPage ? styles['shop-header'] : ''}`}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <a href="/">
              <img src={images.logo} alt="Logo" />
              <h1>ARCADE</h1>
            </a>
          </div>
          <div className={styles.headerRight}>
            <a
              href="/shop"
              className={styles['headerRight-href']}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              Products
            </a>
            <a href="/shop" className={styles['headerRight-href']}>
              Games
            </a>
            <a href="/shop" className={styles['headerRight-href']}>
              Contact Us
            </a>
            <a href="/account" className={styles['headerRight-href']}>
              <img src={images.profileImg} alt="Profile" />
            </a>
            <a
              href="#"
              className={styles['headerRight-href']}
              onClick={(e) => {
                e.preventDefault();
                toggleSidebar();
              }}
            >
              <img src={images.shoppingCart} alt="Cart" />
            </a>
          </div>
        </div>

        {isDropdownOpen && (
          <div
            className={styles['dropdownMenu']}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <a href="/shop/best%20sellers">Best Sellers</a>
            <a href="/shop/games">Games</a>
            <a href="/shop/consoles">Consoles</a>
            <a href="/shop/accessories">Accessories</a>
          </div>
        )}
      </header>

      <Sidebar onClose={toggleSidebar} isOpen={isSidebarOpen} />
    </div>
  );
}
