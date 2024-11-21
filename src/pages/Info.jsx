import React, { useState, useEffect } from 'react';
import styles from '../assets/css/Info.module.css';
import data from '../assets/data/products.json';
import { useParams } from 'react-router-dom';
import { images } from '../components/images';

export default function Info() {
  const { id } = useParams(); // Получаем id из URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Ищем продукт в данных по его id
    const foundProduct = data.find(item => item.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return <p>Loading...</p>; // Если продукт не найден, отображаем "Загрузка"
  }

  return (
    <div>
        <main>
            <section className={styles['wrapper-product']}>
                <div className={styles['product']}>
                <div className={styles['productLeft']}>
                <p>Home / All Products / <a href="#">{product.name}</a></p>
                {/* Отображаем изображение из пути в JSON */}
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
                    <a href="#">Prev</a>
                    <p>|</p>
                    <a href="#">Next</a>
                </div>
                <h1>{product.name}</h1>
                <div className={styles['productRating']}>
                    <img src={images.rating} alt="rating" />
                    <p>{product.rating} | {product.reviews} reviews</p>
                </div>
                <p>ID: {product.id}</p>
                <br />
                <b>{product.price}</b>
                <br />
                <input type="number" />
                <br />
                <div className={styles['productButton']}>
                    <button className={styles['buttonPassive']}>Add to Cart</button>
                    <button className={styles['buttonActive']}>Buy Now</button>
                </div>
                <div className={styles['productList']}>
                    <div className={styles['productDop']}>
                    <a href="#">Product Info</a>
                    <a href="#">+</a>
                    </div>
                    <div className={styles['line-product-dop']}></div>
                    <div className={styles['productDop']}>
                    <a href="#">Return and Refund Policy</a>
                    <a href="#">+</a>
                    </div>
                    <div className={styles['line-product-dop']}></div>
                    <div className={styles['productDop']}>
                    <a href="#">Shipping Info</a>
                    <a href="#">+</a>
                    </div>
                    <div className={styles['productRightLink']}>
                    <a href="#"><img src={images.Watsapp} alt="Watsapp" /></a>
                    <a href="#"><img src={images.Facebook_2} alt="Facebook" /></a>
                    <a href="#"><img src={images.Twitter} alt="Twitter" /></a>
                    <a href="#"><img src={images.Pinterest} alt="Pinterest" /></a>
                    </div>
                </div>
                </div>
            </div>
            </section>

            <section className={styles['wrapper-rating']}>
                <h1>Reviews</h1>
                <div className={styles['rating']}></div>
            </section>

            <section className={styles['wrapper-list']}>
            <div className={styles['list']}>
                <div className={styles['list-header']}>
                    <h2>You Might Also Like</h2>
                </div>
                <div className={styles['list-products']}>
                    <a href='#'>
                        <div className={styles['productImageContainer']}>
                            <img src={images.left} className={styles['productImage']} />
                        </div>
                    </a>
                    <a href='#' className={styles['list-product-form']}>
                        <div className={styles['productImageContainer']}>
                            <img src={images.product} className={styles['productImage']} />
                        </div>
                        <div className={styles['form-info']}>
                            <p>Playbox XZ Gold Edition</p>
                            <p>т 1.000</p>
                        </div>
                    </a>
                    <a href='#' className={styles['list-product-form']}>
                        <div className={styles['productImageContainer']}>
                            <img src={images.product} className={styles['productImage']} />
                        </div>
                        <div className={styles['form-info']}>
                            <p>Playbox XZ Gold Edition</p>
                            <p>т 1.000</p>
                        </div>
                    </a>
                    <a href='#' className={styles['list-product-form']}>
                        <div className={styles['productImageContainer']}>
                            <img src={images.product} className={styles['productImage']} />
                        </div>
                        <div className={styles['form-info']}>
                            <p>Playbox XZ Gold Edition</p>
                            <p>т 1.000</p>
                        </div>
                    </a>
                    <a href='#'>
                        <div className={styles['productImageContainer']}>
                            <img src={images.right} className={styles['productImage']} />
                        </div>
                    </a>
                </div>
            </div>
        </section>

        </main>
    </div>
  )
}
