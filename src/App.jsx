import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home'; 
import Shop from './pages/Shop';
import Info from './pages/Info';
import Loader from './components/Loader'; // Импортируем компонент Loader

function App() {
  const [loading, setLoading] = useState(true); // Состояние загрузки

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

  // Пример имитации загрузки данных (можно заменить на реальную логику загрузки)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // После 2 секунд прекращаем загрузку
    }, 2000);
  }, []);

  return (
    <Router>
      <div>
        <Header />
        <main>
          {/* Показываем loader, если идет загрузка */}
          {loading ? <Loader /> : (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop/*" element={<Shop />} />
              <Route path="/shop/info/:id" element={<Info />} />
            </Routes>
          )}
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
