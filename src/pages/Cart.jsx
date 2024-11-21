import React from 'react'

export default function Cart() {
  return (
    <div>
        <header></header>

        <main>
            <section className={styles['wrapper-cart']}>
                <div className={styles['cart']}>
                    <div className={styles['myCart']}>
                        <h3>My cart</h3>
                        <div className={styles['line-cart']}></div>

                        <div className={styles['myCartInfo']}>
                            
                            <div className={styles['myCartInfoProduct']}>
                                <a href="#"><img src="#" alt="#" /></a>
                                <p>Gameflow Black</p>
                                <p>т 3.000</p>
                            </div>

                            <div className={styles['myCartInfoProductInput']}>
                                <button><img src="#" alt="#" /></button>
                                <p>1</p>
                                <button><img src="#" alt="#" /></button>
                            </div>

                            <p>т 3.000</p>

                            <button className={styles['myCartTrash']}><img src="#" alt="#" /></button>
                        
                        </div>

                        <div className={styles['line-cart']}></div>

                        <a href="#"><img src="#" alt="#" />Enter a promo code</a>
                        <a href="#"><img src="#" alt="#" />Add a note</a>
    

                    </div>

                    <div className={styles['order']}>
                        <p>Order summary</p>
                        <div className={styles['line-cart']}></div>
                        <div className={styles['orderSubtotal']}>
                            <p>Subtotal</p>
                            <p>т 3.000</p>
                        </div>
                        <a href="#">Estimate Delivery</a>
                        <div className={styles['line-cart']}></div>
                        <div className={styles['orderTotal']}>
                            <p>Total</p>
                            <p>т 3.000</p>
                        </div>
                        <button className={styles['buttonPassive']}>Checkout</button>
                        <p><img src="#" alt="#" />Secure Checkout</p>
                    
                    </div> 

                </div>
            </section>
        </main>

        <footer></footer>
    </div>
  )
}
