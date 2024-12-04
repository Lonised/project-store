import React, { useState, useEffect } from 'react';
import styles from '../assets/css/Cart.module.css';
import emailjs from 'emailjs-com';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardDetails, setCardDetails] = useState({ email: '', cardNumber: '' });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const storedItems = localStorage.getItem('cart');
    if (storedItems) {
      setCartItems(JSON.parse(storedItems).items);
    }
  }, []);

  const calculateTotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();

    const cartItemsDetails = cartItems.map(
      (item) => `${item.name} (x${item.quantity}) - т${(item.price * item.quantity).toLocaleString()}`
    );

    console.log('Cart Items:', cartItemsDetails);

    // Отправка email с данными заказа
    emailjs
      .send(
        'service_5d3mqxb', // Ваш Service ID
        'template_bvxke79', // Новый Template ID
        {
          to_email: cardDetails.email, // Email пользователя
          total_price: `т ${calculateTotal().toLocaleString()}`, // Общая сумма
          cart_items: cartItemsDetails.join(', '), // Форматируем товары в строку
        },
        '0qB4cTOsqCXc9Lz4B' // Ваш Public Key
      )
      .then(
        () => {
          // После успешного оформления заказа, очищаем корзину
          setSuccessMessage('Спасибо за заказ! Подтверждение отправлено на вашу почту.');
          setIsModalOpen(false);
          setCardDetails({ email: '', cardNumber: '' });

          // Очистить корзину в localStorage
          localStorage.removeItem('cart');
          
          // Обновить состояние корзины
          setCartItems([]);
        },
        (error) => {
          console.error('Ошибка при отправке письма:', error);
        }
      );
  };

  if (cartItems.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <div>
      <main>
        <section className={styles['wrapper-cart']}>
          <div className={styles['cart']}>
            <div className={styles['myCart']}>
              <h3>My cart</h3>
              <div className={styles['line-cart']}></div>

              {cartItems.map((item) => (
                <div key={item.id} className={styles['myCartInfo']}>
                  <div className={styles['myCartInfoProduct']}>
                    <div className={styles['myCartProduct']}>
                      <a href="#" className={styles['myCartInfoImg']}>
                        <img src={item.image} />
                      </a>
                      <p>{item.name}</p>
                      <p>₸{item.price.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className={styles['line-cart']}></div>
            </div>

            <div className={styles['order']}>
              <p>Order summary</p>
              <div className={styles['line-cart']}></div>
              <div className={styles['orderSubtotal']}>
                <p>Subtotal</p>
                <p>₸ {calculateTotal().toLocaleString()}</p>
              </div>
              <div className={styles['line-cart']}></div>
              <div className={styles['orderTotal']}>
                <p>Total</p>
                <p>₸ {calculateTotal().toLocaleString()}</p>
              </div>
              <div className={styles['orderDown']}>
                <button className={styles['buttonPassive']} onClick={handleCheckout}>Checkout</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modal для оформления заказа */}
      {isModalOpen && (
        <div className={styles['modal']}>
          <form onSubmit={handleOrderSubmit}>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={cardDetails.email}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Card Number:
              <input
                type="text"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleInputChange}
                required
              />
            </label>
            <button className={styles['buttonActive']} type="submit">Place Order</button>
          </form>
          {successMessage && <p>{successMessage}</p>}
        </div>
      )}
    </div>
  );
}
