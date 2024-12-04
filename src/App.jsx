import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Info from './pages/Info';
import Cart from './pages/Cart';
import Loader from './components/Loader'; // Импортируем компонент Loader

function App() {
  const [loading, setLoading] = useState(true); // Состояние загрузки
  const location = useLocation(); // Текущий путь

  useEffect(() => {
    // Инициализация Lenis
    const lenis = new Lenis({
      smooth: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Обработка загрузки при смене маршрута
  useEffect(() => {
    const loadData = () => {
      setLoading(true); // Начинаем загрузку
      setTimeout(() => {
        setLoading(false); // Завершаем загрузку через 1.5 секунды
      }, 1500);
    };

    loadData();
  }, [location]); // Следим за сменой маршрута

  return (
    <div>
      <Header />
      <main>
        {/* Показываем Loader, если идет загрузка */}
        {loading ? (
          <Loader />
        ) : (
          <Routes>
            {/* Основные маршруты */}
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:category" element={<Shop />} />
            <Route path="/shop/info/:id" element={<Info />} />
            <Route path="/shop/cart" element={<Cart />} />
          </Routes>
        )}
      </main>
      <Footer />
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
