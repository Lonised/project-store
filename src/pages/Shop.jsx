import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from '../assets/css/Shop.module.css';
import Card from '../components/Card';
import products from '../assets/data/products.json';
import sortProducts from '../utils/sortProducts';

export default function Shop() {
    const { category } = useParams();
    const [minValue, setMinValue] = useState(10000);
    const [maxValue, setMaxValue] = useState(1000000);
    const [visibleProducts, setVisibleProducts] = useState(9);
    const [sortOption, setSortOption] = useState("recommended");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [productsToRender, setProductsToRender] = useState([]);
    const [isTransitioningOut, setIsTransitioningOut] = useState(false);

    useEffect(() => {
        const filtered = products.filter(product => {
            const matchesCategory =
                !category ||
                category.toLowerCase() === 'all products' ||
                (category.toLowerCase() === 'best sellers' && product.bestSeller) ||
                product.category.toLowerCase() === category.toLowerCase();

            const matchesPrice = product.price >= minValue && product.price <= maxValue;

            return matchesCategory && matchesPrice;
        });

        // Запускаем анимацию исчезновения
        setIsTransitioningOut(true);

        // Ждем завершения анимации
        setTimeout(() => {
            setFilteredProducts(filtered);
            setProductsToRender(filtered);
            setVisibleProducts(9);
            setIsTransitioningOut(false);
        }, 300); // Время анимации (должно совпадать с CSS)
    }, [category, minValue, maxValue]);

    const handleMinChange = (event) => {
        const value = Math.min(Number(event.target.value), maxValue - 1);
        setMinValue(value);
    };

    const handleMaxChange = (event) => {
        const value = Math.max(Number(event.target.value), minValue + 1);
        setMaxValue(value);
    };

    const sortedProducts = sortProducts(productsToRender, sortOption);

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
                                {['All Products', 'Accessories', 'Best Sellers', 'Consoles', 'Controllers', 'Games'].map(cat => (
                                    <Link
                                        key={cat}
                                        to={`/shop/${cat === 'All Products' ? '' : cat.toLowerCase()}`}
                                        className={category === cat ? styles['active-link'] : ''}
                                    >
                                        {cat}
                                    </Link>
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
                            <div className={`${styles['shopListProducts']} ${isTransitioningOut ? styles['fade-out'] : styles['fade-in']}`}>
                                {sortedProducts.slice(0, visibleProducts).map(product => (
                                    <Link to={`/info/${product.id}`} key={product.id}>
                                        <Card
                                            id={product.id}
                                            name={product.name}
                                            price={product.price}
                                            category={product.category}
                                            inStock={product.inStock}
                                            image={product.image}
                                            bestSeller={product.bestSeller}
                                            quantity={product.quantity}
                                        />
                                    </Link>
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


