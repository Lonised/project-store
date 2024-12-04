import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem as addToCartAction } from '../redux/cartSlice'; // Импортируем экшен для добавления товара
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import styles from '../assets/css/Info.module.css';
import data from '../assets/data/products.json';
import { images } from '../components/images';

export default function Info({ onOpen }) { // Получаем пропс onOpen для открытия сайдбара
    const { id } = useParams(); // Получаем id из URL
    const dispatch = useDispatch(); // Хук для работы с Redux
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1); // Устанавливаем начальное значение 1
    const [loading, setLoading] = useState(true); // Состояние для загрузки
    const [animateKey, setAnimateKey] = useState(id); // Ключ для анимации
    const cart = useSelector((state) => state.cart.items); // Получаем товары из корзины через Redux

    const [isProductInfoVisible, setIsProductInfoVisible] = useState(false);
    const [isReturnPolicyVisible, setIsReturnPolicyVisible] = useState(false);
    const [isShippingInfoVisible, setIsShippingInfoVisible] = useState(false);

    useEffect(() => {
        setLoading(true); // Устанавливаем состояние загрузки при изменении id
        const foundProduct = data.find(item => item.id === parseInt(id));
        if (foundProduct) {
        setProduct(foundProduct);
        } else {
        setProduct(null); // Если продукта нет, сбрасываем данные
        }
        setQuantity(1); // Сбрасываем количество на 1
        setAnimateKey(id); // Обновляем ключ анимации
        setLoading(false); // Завершаем загрузку
    }, [id]);

    // Функция для вычисления средней оценки
    const calculateAverageRating = (comments) => {
        if (!comments || comments.length === 0) return 0;
        const totalRating = comments.reduce((acc, comment) => acc + comment.rating, 0);
        return (totalRating / comments.length).toFixed(1); // Округляем до одного знака после запятой
    };

    // Функция для добавления товара в корзину через Redux
    const addToCart = () => {
        const newCartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
          image: product.image
        };
        dispatch(addToCartAction(newCartItem)); // Добавляем товар в корзину через dispatch
    };
      

    // Если загрузка, показываем сообщение
    if (loading) {
        return <p>Loading...</p>;
    }

    // Если продукта нет, показываем сообщение
    if (!product) {
        return <p>Product not found!</p>;
    }

    // Функция для обработки изменения количества
    const handleQuantityChange = (e) => {
        const value = Math.max(1, Math.min(product.quantity, e.target.value)); // Ограничиваем количество от 1 до максимума из JSON
        setQuantity(value);
    };

    // Находим индекс текущего продукта в массиве
    const currentProductIndex = data.findIndex(item => item.id === product.id);

    // Находим id предыдущего и следующего продукта
    const prevProductId = data[currentProductIndex - 1]?.id; // ID предыдущего продукта
    const nextProductId = data[currentProductIndex + 1]?.id; // ID следующего продукта

    // Определяем категорию продукта
    const productCategory = product.category || 'All Products';

    // Вычисляем среднюю оценку и количество комментариев
    const averageRating = calculateAverageRating(product.comments);
    const reviewsCount = product.comments.length;

    const toggleProductInfo = () => setIsProductInfoVisible((prev) => !prev);
    const toggleReturnPolicy = () => setIsReturnPolicyVisible((prev) => !prev);
    const toggleShippingInfo = () => setIsShippingInfoVisible((prev) => !prev);

    const getToggleSymbol = (isVisible) => (isVisible ? '-' : '+');

    return (
    <div>
        <main>
        <SwitchTransition>
            <CSSTransition
                key={animateKey}
                timeout={300}
                classNames={{
                enter: styles['fade-in'],
                enterActive: styles['fade-in-active'],
                exit: styles['fade-out'],
                exitActive: styles['fade-out-active'],
                }}
                unmountOnExit
            >
            <div>
                <section className={styles['wrapper-product']}>
                <div className={styles['product']}>
                    <div className={styles['productLeft']}>
                    <p>
                        Home / <Link to="/shop">{productCategory}</Link> / <a href="#">{product.name}</a>
                    </p>
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        className={styles['productImage']} 
                    />
                    <div className={styles['productInfo']}>
                        <p>{product.description}</p>
                    </div>
                    </div>
                    <div className={styles['productRight']}>
                        <div className={styles['productRightUp']}>
                            {prevProductId && (
                            <Link to={`/shop/info/${prevProductId}`}>Prev</Link>
                            )}
                            <p>|</p>
                            {nextProductId && (
                            <Link to={`/shop/info/${nextProductId}`}>Next</Link>
                            )}
                        </div>
                    <h1>{product.name}</h1>
                    <div className={styles['productRating']}>
                        <img src={images.rating} alt="rating" />
                        <p>{averageRating} | {reviewsCount} reviews</p> {/* Средняя оценка и количество комментариев */}
                    </div>
                    <p>ID: {product.id}</p>
                    <br />
                    <b>{product.price}₸</b>
                    <br />
                    <div className={styles['productInput']}>
                        <p>Quantity of goods :</p>
                        <input
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        min="1"
                        max={product.quantity}
                        />
                    </div>
                    <br />
                    <div className={styles['productButton']}>
                        <button onClick={addToCart} className={styles['buttonPassive']}>Add to Cart</button>
                        <button className={styles['buttonActive']}>Buy Now</button>
                    </div>

                    <div className={styles['productList']}>
                    {/* Product Info */}
                    <div className={styles['productDop']}>
                        <a href="#">Product Info</a>
                        <a onClick={toggleProductInfo}>{getToggleSymbol(isProductInfoVisible)}</a>
                    </div>
                    <div className={styles['line-product-dop']}></div>

                    <CSSTransition
                        in={isProductInfoVisible}
                        timeout={300}
                        classNames={{
                        enter: styles['enter'],
                        enterActive: styles['enter-active'],
                        exit: styles['exit'],
                        exitActive: styles['exit-active'],
                        }}
                        unmountOnExit
                    >
                        <div className={styles['additionalInfo']}>
                        <p>Here is some detailed product information.</p>
                        </div>
                    </CSSTransition>

                    {/* Return and Refund Policy */}
                    <div className={styles['productDop']}>
                        <a href="#">Return and Refund Policy</a>
                        <a onClick={toggleReturnPolicy}>{getToggleSymbol(isReturnPolicyVisible)}</a>
                    </div>
                    <div className={styles['line-product-dop']}></div>

                    <CSSTransition
                        in={isReturnPolicyVisible}
                        timeout={300}
                        classNames={{
                        enter: styles['enter'],
                        enterActive: styles['enter-active'],
                        exit: styles['exit'],
                        exitActive: styles['exit-active'],
                        }}
                        unmountOnExit
                    >
                        <div className={styles['additionalInfo']}>
                        <p>Details about the return and refund policy:</p>
                        <p>You can return the product within 30 days of purchase for a full refund, provided it is in its original condition and packaging. Shipping costs for returns may apply.</p>
                        <p>If the product is defective or damaged during shipping, we will provide a replacement or full refund at no additional cost.</p>
                        </div>
                    </CSSTransition>

                    {/* Shipping Info */}
                    <div className={styles['productDop']}>
                        <a href="#">Shipping Info</a>
                        <a onClick={toggleShippingInfo}>{getToggleSymbol(isShippingInfoVisible)}</a>
                    </div>
                    <div className={styles['line-product-dop']}></div>

                    <CSSTransition
                        in={isShippingInfoVisible}
                        timeout={300}
                        classNames={{
                        enter: styles['enter'],
                        enterActive: styles['enter-active'],
                        exit: styles['exit'],
                        exitActive: styles['exit-active'],
                        }}
                        unmountOnExit
                    >
                        <div className={styles['additionalInfo']}>
                        <p>Details about the shipping information:</p>
                        <p>We offer worldwide shipping with delivery times varying by location. Most orders are processed within 1-2 business days.</p>
                        <p>Standard shipping typically takes 5-7 business days, while expedited options are available at checkout for faster delivery.</p>
                        <p>Track your shipment with the tracking number provided in your confirmation email.</p>
                        </div>
                    </CSSTransition>

                    <div className={styles['productRightLink']}>
                        <a href="#">
                        <img src={images.Watsapp} alt="Watsapp" />
                        </a>
                        <a href="#">
                        <img src={images.Facebook_2} alt="Facebook" />
                        </a>
                        <a href="#">
                        <img src={images.Twitter} alt="Twitter" />
                        </a>
                        <a href="#">
                        <img src={images.Pinterest} alt="Pinterest" />
                        </a>
                    </div>
                    </div>
                    </div>
                </div>
                </section>

                <section className={styles['wrapper-rating']}>
                <div className={styles['rating']}>
                <h1>Reviews: {averageRating}</h1>
                <div className={styles['line-product-dop']}></div>
                    {product.comments.map((comment, index) => (
                    <div className={styles['ratingForm']} key={index}>
                        <div className={styles['ratingFormUp']}>
                        <b>{comment.user}</b> {/* Имя пользователя */}
                        </div>
                        <div className={styles['ratingFormMiddle']}>
                        <p>{comment.comment}</p> {/* Текст комментария */}
                        </div>
                        <div className={styles['ratingFormDown']}>
                        <p>Rating:</p>
                        <b>{comment.rating}</b> {/* Оценка */}
                        </div>
                        <div className={styles['line-product-dop']}></div>
                    </div>
                    ))}
                </div>
                </section>

                <section className={styles['wrapper-list']}>
                <div className={styles['list']}>
                    <div className={styles['list-header']}>
                    <h2>You Might Also Like</h2>
                    </div>
                    <div className={styles['list-products']}>
                    {data
                        .filter(
                        (item) => item.category === product.category && item.id !== product.id
                        )
                        .slice(0, 3) 
                        .map((relatedProduct) => (
                        <Link
                            key={relatedProduct.id}
                            to={`/shop/info/${relatedProduct.id}`}
                            className={styles['list-product-form']}
                        >
                            <div className={styles['productImageContainer']}>
                            <img
                                src={relatedProduct.image}
                                alt={relatedProduct.name}
                                className={styles['productImage']}
                            />
                            </div>
                            <div className={styles['form-info']}>
                            <p>{relatedProduct.name}</p>
                            <p>{relatedProduct.price}₸</p>
                            <button className={styles['buttonPassive']}>Add to Cart</button>
                            </div>
                        </Link>
                        ))}
                    </div>
                </div>
                </section>
            </div>
        </CSSTransition>
        </SwitchTransition>
      </main>
    </div>
  );
}
