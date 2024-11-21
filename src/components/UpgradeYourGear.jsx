import React from 'react';
import styles from '../assets/css/Home.module.css';

export default function UpgradeYourGear({ accessories, visibleAccessories, scrollLeft, scrollRight, slideDirection }) {
    return (
        <section className={styles['wrapper-products']}>
            <div className={styles['products']}>
                <div className={styles['products-header']}>
                    <h2>UPGRADE YOUR GEAR</h2>
                    <button className={styles['buttonActive']}>View All</button>
                </div>
                <div className={`${styles['product']} ${styles[`slide-${slideDirection}`]}`}>
                    {/* Кнопка влево */}
                    <a href="#" onClick={scrollLeft}>
                        <img src="#" alt="Scroll Left" className={styles['scroll-button']} />
                    </a>

                    {/* Карточки аксессуаров */}
                    {visibleAccessories.map((product) => (
                        <div key={product.id} className={styles['product-form']}>
                            <img src={product.image} alt={product.name} />
                            <p>{product.name}</p>
                            <p>т {product.price}</p>
                            <button className={styles['buttonPassive']}>Add to Cart</button>
                        </div>
                    ))}

                    {/* Кнопка вправо */}
                    <a href="#" onClick={scrollRight}>
                        <img src="#" alt="Scroll Right" className={styles['scroll-button']} />
                    </a>
                </div>
            </div>
        </section>
    );
}
