import React, { useEffect, useState } from "react";
import styles from "../assets/css/ProductList.module.css";
import productData from "../assets/data/products.json";
import { images } from "../components/images";
import { useDispatch } from "react-redux"; // Импортируем useDispatch
import { addItem } from "../redux/cartSlice";
import { Link } from "react-router-dom";

const ProductList = ({ category, title, showButtons = true }) => {
  const [products, setProducts] = useState([]);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [animationStage, setAnimationStage] = useState("visible"); // 'visible', 'hiding', 'showing'
  const [isMobile, setIsMobile] = useState(false); // Состояние для мобильных устройств
  const dispatch = useDispatch(); // Инициализируем dispatch

  useEffect(() => {
    // Определяем ширину экрана и устанавливаем isMobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767); // Устанавливаем isMobile в true, если ширина экрана <= 767px
    };
    checkMobile();
    window.addEventListener("resize", checkMobile); // Следим за изменением размера экрана

    return () => {
      window.removeEventListener("resize", checkMobile); // Очистка при размонтировании компонента
    };
  }, []);

  useEffect(() => {
    // Фильтрация товаров по категории
    const filteredProducts = category
      ? productData.filter((product) => product.category === category)
      : productData;
    setProducts(filteredProducts);
  }, [category]);

  const handleScroll = (direction) => {
    if (animationStage !== "visible") return; // Избегаем повторных анимаций

    setAnimationStage("hiding");

    setTimeout(() => {
      setVisibleIndex((prevIndex) => {
        const newIndex =
          direction === "left"
            ? prevIndex === 0
              ? products.length - (isMobile ? 1 : 3)
              : prevIndex - 1
            : prevIndex === products.length - (isMobile ? 1 : 3)
            ? 0
            : prevIndex + 1;
        return newIndex;
      });
      setAnimationStage("showing");
    }, 300); // Время синхронизации с CSS-анимацией исчезновения

    setTimeout(() => setAnimationStage("visible"), 600); // Время синхронизации с CSS-анимацией появления
  };

  const handleAddToCart = (product) => {
    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1, // или другое значение по умолчанию
        image: product.image,
      })
    );
  };

  return (
    <section className={styles["wrapper-products"]}>
      <div className={styles.products}>
        <div className={styles["products-header"]}>
          <h2>{title}</h2>
          {showButtons && (
            <Link to="/shop">
              <button className={styles["buttonActive"]}>View All</button>
            </Link>
          )}
        </div>
        <div className={styles.product}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleScroll("left");
            }}
          >
            <img
              src={images.left}
              alt="Previous"
              className={styles["scroll-button"]}
            />
          </a>
          {products.length > 0 && (
            <div
              className={`${styles["product-form"]} ${
                animationStage === "hiding"
                  ? styles["fade-out"]
                  : animationStage === "showing"
                  ? styles["fade-in"]
                  : ""
              }`}
            >
              {products
                .slice(visibleIndex, visibleIndex + (isMobile ? 1 : 3)) // Показываем 1 товар для мобильных устройств, 3 для десктопа
                .map((product) => (
                  <div key={product.id} className={styles["product-item"]}>
                    <img src={product.image} alt={product.name} />
                    <p>{product.name}</p>
                    <p>т {product.price}</p>
                    <button 
                      className={styles["buttonPassive"]}
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
            </div>
          )}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleScroll("right");
            }}
          >
            <img
              src={images.right}
              alt="Next"
              className={styles["scroll-button"]}
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
