import React, { useEffect, useState } from "react";
import styles from "../assets/css/ProductList.module.css"; // Подключаем ваши стили
import productData from "../assets/data/products.json"; // Импортируем данные


const ProductList = () => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    // Выбираем случайные продукты
    const getRecommendedProducts = () => {
      const recommended = productData.filter((product) => product.recommendation);
      const shuffled = [...recommended].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 3); // Берем 3 продукта
    };

    setRecommendedProducts(getRecommendedProducts());
  }, []);

  return (
    <section className={styles["wrapper-list"]}>
      <div className={styles.list}>
        <div className={styles["list-products"]}>
          <a href="#" className={styles["list-product-form"]}>
            <div className={styles["productImageContainer"]}>
              <img src={images.left} className={styles["productImage"]} alt="Previous" />
            </div>
          </a>
          {recommendedProducts.map((product) => (
            <a key={product.id} href="#" className={styles["list-product-form"]}>
              <div className={styles["productImageContainer"]}>
                <img
                  src={product.image}
                  className={styles["productImage"]}
                  alt={product.name}
                />
              </div>
              <div className={styles["form-info"]}>
                <p>{product.name}</p>
                <p>т {product.price}</p>
              </div>
            </a>
          ))}
          <a href="#" className={styles["list-product-form"]}>
            <div className={styles["productImageContainer"]}>
              <img src={images.right} className={styles["productImage"]} alt="Next" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductList;

