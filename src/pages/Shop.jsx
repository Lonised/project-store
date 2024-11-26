import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../assets/css/Shop.module.css';
import Card from '../components/Card';
import products from '../assets/data/products.json';
import sortProducts from '../utils/sortProducts';
import { Link } from 'react-router-dom';

export default function Shop() {
    const { category } = useParams(); // Получаем категорию из URL, если она есть
    const [minValue, setMinValue] = useState(10000);
    const [maxValue, setMaxValue] = useState(1000000);
    const [visibleProducts, setVisibleProducts] = useState(9);
    const [sortOption, setSortOption] = useState("recommended");
    const [filteredProducts, setFilteredProducts] = useState(products); // Состояние для фильтрации продуктов
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        // Фильтрация продуктов при изменении категории или цены
        const newFilteredProducts = products.filter(product =>
            (!category || category === 'All Products' || product.category === category) &&
            (category !== 'Best Sellers' || product.bestSeller) &&
            product.price >= minValue && product.price <= maxValue
        );
        setFilteredProducts(newFilteredProducts);
        setVisibleProducts(9); // Сброс отображаемых продуктов при смене категории
    }, [category, minValue, maxValue]); // Перезапускать при изменении категории, минимальной и максимальной цены

    const handleMinChange = (event) => {
        const value = Math.min(Number(event.target.value), maxValue - 1);
        setMinValue(value);
    };

    const handleMaxChange = (event) => {
        const value = Math.max(Number(event.target.value), minValue + 1);
        setMaxValue(value);
    };

    const handleCategoryChange = (newCategory) => {
        setIsTransitioning(true);
        setTimeout(() => {
            setFilteredProducts(
                products.filter(product =>
                    newCategory === 'All Products' || product.category === newCategory
                )
            );
            setIsTransitioning(false);
            setVisibleProducts(9); // Сброс отображаемых продуктов при изменении категории
        }, 500);
    };

    const sortedProducts = sortProducts(filteredProducts, sortOption);

    const loadMore = () => {
        setVisibleProducts(prevVisible => prevVisible + 6);
    };

    return (
        <div>
            <header></header>
            <main>
                <section className={styles['wrapper-shop']}>
                    <div className={styles['shop']}>
                        <div className={styles['shopForm']}>
                            <p className={styles['shop-href']}>
                                <Link to="/" className={styles['home-link']}>Home</Link> - {category || 'All Products'}
                            </p>
                            <h3>Browse by</h3>
                            <div className={styles['line-shop-form']}></div>
                            <div className={styles['shopFormList']}>
                                {['All Products', 'Accessories', 'Best Sellers', 'Consoles', 'Controllers', 'Games', 'On Sale'].map(cat => (
                                    <a
                                        key={cat}
                                        href="#"
                                        onClick={() => handleCategoryChange(cat)}
                                        className={category === cat ? styles['active-link'] : ''}
                                    >
                                        {cat}
                                    </a>
                                ))}
                            </div>
                            <h3>Filter by</h3>
                            <div className={styles['line-shop-form']}></div>
                            <div className={styles['shopFormFilter']}>
                                <div className={styles['formFilterDop']}>
                                    <p>Price</p>
                                    <a href="#">-</a>
                                </div>

                                <div className={styles['rangeContainer']}>
                                    <input
                                        type="range"
                                        min="10000"
                                        max="1000000"
                                        value={minValue}
                                        onChange={handleMinChange}
                                        className={styles['formFilterRange']}
                                    />
                                    <input
                                        type="range"
                                        min="10000"
                                        max="1000000"
                                        value={maxValue}
                                        onChange={handleMaxChange}
                                        className={styles['formFilterRange']}
                                    />
                                </div>

                                <div className={styles['formFilterDop']}>
                                    <p>₸ {minValue.toLocaleString()}</p>
                                    <p>₸ {maxValue.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles['shopList']}>
                            <h1>{category || 'All Products'}</h1>
                            <div className={styles['shopListSort']}>
                                <p>{`Showing ${Math.min(visibleProducts, sortedProducts.length)} of ${sortedProducts.length} products`}</p>

                                <select 
                                    value={sortOption} 
                                    onChange={(e) => setSortOption(e.target.value)} 
                                    className={styles['custom-select']}  
                                >
                                    <option value="recommended" className={styles['custom-option']}>Recommended</option>
                                    <option value="newest" className={styles['custom-option']}>Newest</option>
                                    <option value="priceLowToHigh" className={styles['custom-option']}>Price (low to high)</option>
                                    <option value="priceHighToLow" className={styles['custom-option']}>Price (high to low)</option>
                                    <option value="nameAZ" className={styles['custom-option']}>Name A-Z</option>
                                    <option value="nameZA" className={styles['custom-option']}>Name Z-A</option>
                                </select>
                            </div>
                            <div className={`${styles['shopListProducts']} ${isTransitioning ? styles['fade-out'] : styles['fade-in']}`}>
                                {sortedProducts.slice(0, visibleProducts).map(product => (
                                    <Card 
                                        key={product.id}
                                        id={product.id}
                                        name={product.name}
                                        price={product.price}
                                        category={product.category}
                                        inStock={product.inStock}
                                        image={product.image}
                                        bestSeller={product.bestSeller}
                                        quantity={product.quantity}
                                    />
                                ))}
                            </div>
                            <div className={styles['shopListDown']}>           
                                {visibleProducts < sortedProducts.length && (
                                    <button className={styles['buttonPassive']} onClick={loadMore}>
                                        Load More
                                    </button>
                                )}
                            </div>


                        </div>
                    </div>
                </section>
            </main>
            <footer></footer>
        </div>
    );
}
