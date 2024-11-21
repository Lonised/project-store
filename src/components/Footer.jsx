import React from 'react'
import styles from '../assets/css/Footer.module.css';
import { images } from './images';

export default function Footer() {
  return (
    <div>
        <footer className={styles['wrapper-footer']}>
            <div className={styles['footer']}>
                <div className={styles['footerUp']}>
                    <div className={styles['footerUpLogo']}>
                        <img src={images.logo}/>
                        <h1>ARCADE</h1>
                    </div>
                    <div className={styles['footerUpList']}>
                        <b>Products</b>
                        <a href="#">Games</a>
                        <a href="#">Consoles</a>
                        <a href="#">Controllers</a>
                        <a href="#">Accessories</a>
                    </div>
                    <div className={styles['footerUpList']}>
                        <b>Store</b>
                        <p>Ave. Bukhar-Zhyrau 75/3, Karaganda 100024</p>
                        <p>Mon - Fri 9am - 9pm</p>
                        <p>arcade_game_store@gmail.com</p>
                        <p>7-777-753-10-24</p>
                    </div>
                    <div className={styles['footerUpList']}>
                        <b>Policy</b>
                        <a href="#">Terms & Conditions</a>
                        <a href="#">Shipping Policy</a>
                        <a href="#">Refund Policy</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Cookie Policy</a>
                        <a href="#">FAQ</a>
                    </div>
                </div>
                <div className={styles['line-home']}></div>
                <div className={styles['footerDown']}>
                    <div className={styles['footerDownLeft']}>
                        <b>Payment Methods</b>
                        <div className={styles['footerDownFlex']}>
                            <a href="#"><img src={images.Visa}/></a>
                            <a href="#"><img src={images.MasterCard}/></a>
                            <a href="#"><img src={images.AmericanExpress}/></a>
                            <a href="#"><img src={images.JCB}/></a>
                            <a href="#"><img src={images.Discover}/></a>
                            <a href="#"><img src={images.ChinaUnion}/></a>
                            <a href="#"><img src={images.Diners}/></a>
                            <a href="#"><img src={images.PayPal}/></a>
                        </div>
                    </div>
                    <div className={styles['footerDownRight']}>
                        <b>Join the Community</b>
                        <div className={styles['footerDownSocial']}>
                            <a href="#"><img src={images.Facebook}/></a>
                            <a href="#"><img src={images.Instagram}/></a>
                            <a href="#"><img src={images.Youtube}/></a>
                            <a href="#"><img src={images.Discord}/></a>
                        </div>

                    </div>
                </div>
            </div>
        </footer> 
    </div>

  )
}
