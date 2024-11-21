// src/components/ProductList.jsx
import React from 'react';
import styles from '../assets/css/ProductList.module.css';  // Если понадобится, создайте стили
import { images } from './images';  // Подключение изображений (или передавайте их через пропсы)

const ProductList = ({ title, products }) => {
  return (
    <section className={styles['wrapper-products']}>
      <div className={styles['products']}>
        <div className={styles['products-header']}>
          <h2>{title}</h2>
          <button className={styles['buttonActive']}>View All</button>
        </div>
        <div className={styles['productItems']}>
          {products.map((product, index) => (
            <div className={styles['productItem']} key={index}>
              <img src={product.image} alt={product.name} />
              <div className={styles['productInfo']}>
                <p>{product.name}</p>
                <p>{product.price}</p>
              </div>
              <button className={styles['buttonPassive']}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
