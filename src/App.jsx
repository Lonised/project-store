import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home'; 
import Shop from './pages/Shop';
import Info from './pages/Info';

function App() {
  return (
    <Router>
      <div>
        <Header /> {/* Header будет отображаться на всех страницах */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} /> {/* Главная страница */}
            <Route path="/shop/*" element={<Shop />} /> {/* Страница магазина с динамическими подкатегориями */}
            <Route path="/shop/info/:id" element={<Info />} /> {/* Страница информации о товаре */}
          </Routes>
        </main>
        <Footer /> {/* Footer будет отображаться на всех страницах */}
      </div>
    </Router>
  );
}

export default App;
