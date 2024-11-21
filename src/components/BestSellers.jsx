import React from 'react';
import styles from '../assets/css/Home.module.css';
import { images } from '../components/images';

export default function BestSellers() {
    return (
        <section className={styles['wrapper-bestsellers']}>
            <div className={styles['bestsellers']}>
                <div className={styles['bestsellers-header']}>
                    <h2>BEST SELLERS</h2>
                    <button className={styles['buttonActive']}>View All</button>
                </div>
                <div className={styles['bestProducts']}>
                    <a href="#"><img src={images.left} alt="Scroll Left" /></a>
                    <div className={styles['bestProducstForm']}>
                        <img src={images.product} alt="Product" />
                        <div className={styles['formInfo']}>
                            <p>Playbox XZ Gold Edition</p>
                            <p>т 1.000</p>
                        </div>
                        <button className={styles['buttonPassive']}>Add to Cart</button>
                    </div>
                    <a href="#"><img src={images.right} alt="Scroll Right" /></a>
                </div>
            </div>
        </section>
    );
}
