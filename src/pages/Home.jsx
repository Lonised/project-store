import React, { useState, useEffect } from 'react';
import styles from '../assets/css/Home.module.css';
import { images } from '../components/images';
import data from '../assets/data/products.json'

export default function Home() {
    // Фильтрация данных для аксессуаров и игр
    const accessories = data.filter(product => product.category === "Accessories");
    const games = data.filter(product => product.category === "Trending Games");

    // Стейт для видимых товаров
    const [visibleAccessories, setVisibleAccessories] = useState(accessories.slice(0, 3));
    const [visibleGames, setVisibleGames] = useState(games.slice(0, 3));

    // Стейт для направления слайдов
    const [slideDirectionAccessories, setSlideDirectionAccessories] = useState('');
    const [slideDirectionGames, setSlideDirectionGames] = useState('');

    // Функции для перелистывания товаров
    const scrollAccessoriesLeft = () => {
        setSlideDirectionAccessories('left');
        setVisibleAccessories(prev => {
            const firstProduct = prev[0];
            const newIndex = (accessories.indexOf(firstProduct) - 1 + accessories.length) % accessories.length;
            return accessories.slice(newIndex, newIndex + 3);
        });
    };

    const scrollAccessoriesRight = () => {
        setSlideDirectionAccessories('right');
        setVisibleAccessories(prev => {
            const lastProduct = prev[prev.length - 1];
            const newIndex = (accessories.indexOf(lastProduct) + 1) % accessories.length;
            return accessories.slice(newIndex, newIndex + 3);
        });
    };

    const scrollGamesLeft = () => {
        setSlideDirectionGames('left');
        setVisibleGames(prev => {
            const firstGame = prev[0];
            const newIndex = (games.indexOf(firstGame) - 1 + games.length) % games.length;
            return games.slice(newIndex, newIndex + 3);
        });
    };

    const scrollGamesRight = () => {
        setSlideDirectionGames('right');
        setVisibleGames(prev => {
            const lastGame = prev[prev.length - 1];
            const newIndex = (games.indexOf(lastGame) + 1) % games.length;
            return games.slice(newIndex, newIndex + 3);
        });
    };

    return (
    <div>
        <main>
            <section className={styles['wrapper-cover']}>
                <div className={styles['cover-background']}></div> 
                <div className={styles['cover']}>
                    <div className={styles['coverLeftInfo']}>
                        <p>Power up your game</p>
                        <h1>CYBER KID INFINITE</h1>
                        <p>Now Avaulable on PC & Console</p>
                        <button className={styles['buttonActive']}>Buy Now</button>
                    </div>
                    <div className={styles['coverRightImg']}>
                        <img src={images.Games}/>
                    </div>
                </div>
            </section>

            <section className={styles['wrapper-bestsellers']}>
                <div className={styles['bestsellers']}>
                    <div className={styles['bestsellers-header']}>
                        <h2>BEST SELLERS</h2>
                        <button className={styles['buttonActive']}>View All</button>
                    </div>
                    <div className={styles['bestProducts']}>
                        <a href='#'><img src={images.left}/></a>
                        <div className={styles['bestProducstForm']}>
                            <img src={images.product} />
                            <div className={styles['formInfo']}>
                                <p>Playbox XZ Gold Edition</p>
                                <p>т 1.000</p>
                            </div>
                            <button className={styles['buttonPassive']}>Add to Cart</button>
                        </div>
                        <a href='#'><img src={images.right}/></a>
                    </div>
                </div>
            </section>

            <section className={styles['wrapper-category']}>
                <div className={styles['category']}>
                    <div className={styles['categoryName']}>
                        <h2>SHOP BY CATEGORY</h2>
                    </div>
                    <div className={styles['categoryForm']}>
                        <div className={styles['categoryFormA']}>
                            <a href='#'>
                                <div className={styles['imageWrapper']}>
                                    <img src={images.Consoles}/>
                                </div>
                                <p>Consoles</p>
                            </a>
                        </div>

                        <div className={styles['categoryFormA']}>
                            <a href='#'>
                                <div className={styles['imageWrapper']}>
                                    <img src={images.Accessories}/>
                                </div>
                                <p>Accessories</p>
                            </a>
                        </div>

                        <div className={styles['categoryFormA']}>
                            <a href='#'>
                                <div className={styles['imageWrapper']}>
                                    <img src={images.Controllers}/>
                                </div>
                                <p>Controllers</p>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles['wrapper-discounts']}>
                <div className={styles['discounts']}>
                    <div className={styles['discountsLeft']}>
                        <p>THIS WEEK'S DEALS</p>
                        <h3>10%</h3>
                        <h2>off all games</h2>
                        <button className={styles['buttonActive']}>Shop Now</button>
                    </div>  
                    <div className={styles['discountsRight']}>
                        <img className={styles['discountsRightImg_1']} src={images.Games}/>
                        <img className={styles['discountsRightImg_2']} src={images.Games_1}/>
                        <img className={styles['discountsRightImg_3']} src={images.Games_2}/>
                    </div>
                </div> 
            </section>

            <section className={styles['wrapper-products']}>
            <div className={styles['products']}>
                <div className={styles['products-header']}>
                <h2>UPGRADE YOUR GEAR</h2>
                <button className={styles['buttonActive']}>View All</button>
                </div>
                <div className={`${styles['product']} ${styles[`slide-${slideDirectionAccessories}`]}`}>
                {/* Кнопка влево */}
                <a href="#" onClick={scrollAccessoriesLeft}>
                    <img src={images['left']} alt="Scroll Left" className={styles['scroll-button']} />
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
                <a href="#" onClick={scrollAccessoriesRight}>
                    <img src={images['right']} alt="Scroll Right" className={styles['scroll-button']} />
                </a>
                </div>
            </div>
            </section>

            <section className={styles['wrapper-offer']}>
                <div className={styles['offer-background']}>
                    <div className={styles['offer']}>
                        <h1>SPEND & SAVE</h1>
                        <p>Save 20% when you spend more than $125</p>
                        <button className={styles['buttonPassive']}>Shop Now</button>
                    </div>    
                </div>
            </section>

            <section className={styles['wrapper-games']}>
                <div className={styles['games']}>
                    <div className={styles['games-header']}>
                        <h2>TRENDING GAMES</h2>
                        <button className={styles['buttonActive']}>View All</button>
                    </div>
                    <div className={`${styles['gamesProducts']} ${styles[`slide-${slideDirectionGames}`]}`}>
                        {/* Кнопка влево */}
                        <a href="#" onClick={scrollGamesLeft}>
                            <img src="left-arrow-icon.png" alt="Scroll Left" className={styles['scroll-button']} />
                        </a>

                        {/* Карточки игр */}
                        {visibleGames.map((game) => (
                            <div key={game.id} className={styles['games-form']}>
                                <img src={game.image} alt={game.name} />
                                <p>{game.name}</p>
                                <p>т {game.price}</p>
                                <button className={styles['buttonPassive']}>Add to Cart</button>
                            </div>
                        ))}

                        {/* Кнопка вправо */}
                        <a href="#" onClick={scrollGamesRight}>
                            <img src="right-arrow-icon.png" alt="Scroll Right" className={styles['scroll-button']} />
                        </a>
                    </div>
                </div>
            </section>

            <section className={styles['wrapper-distribution']}>
                <div className={styles['distribution']}>
                    <h2>NEWSLETTER</h2>
                    <p>Sign up to receive updates on new products and special offers</p>
                    <div className={styles['distributionForm']}>
                        <p>Email *</p>
                        <input type="text" />
                        <div className={styles['distributionFormButons']}>
                            <input type="radio" name="#" id="#" />
                            <p>Yes, subscribe me to your newsletter</p>
                            <button className={styles['buttonSubmit']}>Submit</button>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles['wrapper-background']}>
                <div className={styles['background']}>
                    <img src="#" alt="#" />
                </div>
            </section>


        </main>
    </div>
  )
}
