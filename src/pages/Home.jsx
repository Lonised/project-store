import React, { useState, useEffect, useRef } from 'react';
import styles from '../assets/css/Home.module.css';
import { images } from '../components/images';
import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList'; 
import emailjs from 'emailjs-com';

export default function Home() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [animationTriggered, setAnimationTriggered] = useState(false);

    const formRef = useRef();
    const sectionsRef = useRef([]);

    // Отслеживаем прокрутку
    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Триггер анимации при загрузке
    useEffect(() => {
        const timer = setTimeout(() => setAnimationTriggered(true), 100); // Небольшая задержка
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.visible);
                    }
                });
            },
            { threshold: 0.1 }
        );
    
        sectionsRef.current.forEach((section) => {
            if (section instanceof Element) {
                observer.observe(section);
            }
        });
    
        return () => {
            sectionsRef.current.forEach((section) => {
                if (section instanceof Element) {
                    observer.unobserve(section);
                }
            });
        };
    }, []);
    

    // Отправка email через EmailJS
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                'service_5d3mqxb', // Ваш service_id
                'template_2ofdsii', // Ваш template_id
                formRef.current,
                '0qB4cTOsqCXc9Lz4B' // Ваш public_key
            )
            .then(
                (response) => {
                    console.log('Email отправлен!', response.status, response.text);
                },
                (error) => {
                    console.error('Ошибка при отправке письма:', error);
                }
            );
    };

    return (
    <div>
        <main>
            <section
            ref={(el) => (sectionsRef.current[0] = el)}
            className={`${styles['wrapper-cover']} ${styles.hidden}`}
            >   
                <div
                    className={styles['cover-background']}
                    style={{ transform: `translateY(${scrollPosition * 0.5}px)` }}
                ></div>
                <div className={styles['cover']}>
                    <div
                        className={`${styles['coverLeftInfo']} ${
                            animationTriggered ? styles['slide-in-left'] : ''
                        }`}
                    >
                        <p>Power up your game</p>
                        <h1>CYBER KID INFINITE</h1>
                        <p>Now Available on PC & Console</p>
                        <button className={styles['buttonActive']}>Buy Now</button>
                    </div>
                    <div
                        className={`${styles['coverRightImg']} ${
                            animationTriggered ? styles['slide-in-right'] : ''
                        }`}
                    >
                        <a href="/shop/info/6">
                            <img src={images.Games_3} alt="Game cover" />
                        </a>
                    </div>
                </div>
            </section>


            <section
            ref={(el) => (sectionsRef.current[1] = el)}
            className={`${styles['wrapper-products']} ${styles.hidden}`}
            >
                <ProductList 
                    category="Controllers"
                    title="TRENDING CONTROLLERS"
                    showButtons={true}
                />
            </section>

            <section
            ref={(el) => (sectionsRef.current[2] = el)}
            className={`${styles['wrapper-discounts']} ${styles.hidden}`}
            >
                <div className={styles['discounts']}>
                    <div className={styles['discountsLeft']}>
                        <p>THIS WEEK'S DEALS</p>
                        <h3>10%</h3>
                        <h2>off all games</h2>
                        <Link to="/shop">
                            <button className={styles['buttonActive']}>Shop Now</button>
                        </Link>

                    </div>  
                    <div className={styles['discountsRight']}>
                        <img className={styles['discountsRightImg_1']} src={images.Games}/>
                        <img className={styles['discountsRightImg_2']} src={images.Games_1}/>
                        <img className={styles['discountsRightImg_3']} src={images.Games_2}/>
                    </div>
                </div> 
            </section>

            <section
            ref={(el) => (sectionsRef.current[3] = el)}
            className={`${styles['wrapper-products']} ${styles.hidden}`}
            >
                <ProductList 
                    category="Accessories"
                    title="UPGRADE YOUR GEAR"
                    showButtons={true}
                />
            </section>

            <section
            ref={(el) => (sectionsRef.current[4] = el)}
            className={`${styles['wrapper-offer']} ${styles.hidden}`}
            >
                <div className={styles['offer-background']}>
                    <div className={styles['offer']}>
                        <h1>SPEND & SAVE</h1>
                        <p>Save 20% when you spend more than $125</p>
                        <button className={styles['buttonPassive']}>Shop Now</button>
                    </div>    
                </div>
            </section>

            <section
            ref={(el) => (sectionsRef.current[5] = el)}
            className={`${styles['wrapper-products']} ${styles.hidden}`}
            >
                <ProductList 
                    category="Games"
                    title="TRENDING GAMES"
                    showButtons={true}
                />
            </section>



            <section
                ref={(el) => (sectionsRef.current[6] = el)}
                className={`${styles['wrapper-distribution']} ${styles.hidden}`}
            >
                <div className={styles['distribution']}>
                    <div className={styles['distributionUp']}>
                        <h2>NEWSLETTER</h2>
                        <p>Sign up to receive updates on new products and special offers</p>
                    </div>
                    <form ref={formRef} onSubmit={sendEmail} className={styles['distributionForm']}>
                        <label className={styles['distributionForm']}>
                            <p>Email *</p>
                            <input type="email" name="to_email" placeholder="Enter your email" required />
                        </label>
                        <div className={styles['distributionFormButons']}>
                            <label className={styles['distributionFormButons']}>
                                <input type="radio" name="subscribe" value="yes" required />
                                <p>Yes, subscribe me to your newsletter</p>
                            </label>
                            <button type="submit" className={styles['buttonActive']}>
                                Submit
                            </button>
                        </div>
                    </form>
                    <Link to="/shop/games">
                        <img className={styles['distributionImg']} src={images.books} alt="Newsletter banner" />
                    </Link>
                </div>
            </section>

            <section
            ref={(el) => (sectionsRef.current[7] = el)}
            className={`${styles['wrapper-background']} ${styles.hidden}`}
            >
                <div className={styles['background']}>
                    <img src={images.wallpaper2} />
                </div>
            </section>
        </main>
    </div>
  )
}






