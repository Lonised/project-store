import React from 'react'

export default function Product() {
  return (
    <div>
      <header></header>
      <main>
        <section className={styles['wrapper-product']}>
          <div className={styles['product']}>
            <div className={styles['productsUp']}>
              /*ЗДЕСЬ БУДЕТ ССЫЛКИ A HREF*/
            </div>

            <div className={styles['productsLeft']}>
                <img src="#" alt="#" />
                <p>I'm a product description. This is a great place to "sell" your product and grab buyers' attention. Describe your product clearly and concisely. Use unique keywords. Write your own description instead of using manufacturers' copy.</p>
            </div>
            <div className={styles['productsRight']}>
              <h2>Gameflow Black</h2>
              <p>SKU: 0001</p>
              <p>$900.00</p>
              <input type="#" /> /*ВЫБИРАТЬ КОЛ-ВО ДАННОГО ПРОДУКТА*/
              <button className={styles['buttonPassive']}>Add to Cart</button>
              <button className={styles['buttonActive']}>Buy Now</button>

              <a href="#">Product info <img src="#" alt="#" /></a>
              <a href="#">Return and Refund Policy <img src="#" alt="#" /></a>
              <a href="#">Shipping info <img src="#" alt="#" /></a>

              <a href="#"><img src="#" alt="#" /></a>
              <a href="#"><img src="#" alt="#" /></a>
              <a href="#"><img src="#" alt="#" /></a>
              <a href="#"><img src="#" alt="#" /></a>
              
            </div>
            <div className={styles['productsDown']}>
              <h4>No Reviews Yet</h4>
              <p>Share your thoughts. Be the first to leave a review</p>

              <button className={styles['buttonComments']}>Leave a Review</button>
            </div>
          </div>
        </section>

        <section className={styles['wrapper-products']}>
          <div className={styles['products']}>
              <div className={styles['products-header']}>
                  <h2>You Might Also Like</h2>
                  <button className={styles['buttonActive']}>View All</button>
              </div>
              <div className={styles['product']}>
                  <button><img src="#" alt="#" />left</button>
                  <div className={styles['product-form']}>
                      <img src="#" alt="#" />
                      <p>L503 Headset</p>
                      <p>т 2.000</p>
                      <button className={styles['buttonPassive']}>Add to Cart</button>
                  </div>
                  <button><img src="#" alt="#" />right</button>
              </div>
          </div>
        </section>
      </main>

      <footer></footer>

    </div>
  )
}
