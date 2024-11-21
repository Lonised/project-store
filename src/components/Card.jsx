import React from 'react';
import { Link } from 'react-router-dom'; // Импортируем Link
import styles from '../assets/css/Card.module.css';

const Card = ({ id, name, price, category, inStock, image, bestSeller, quantity, recommendation, description, comments }) => {
  return (
    <Link 
      to={{
        pathname: `/shop/info/${id}`, 
        state: { name, price, category, inStock, image, bestSeller, quantity, description, comments } // Передаем данные продукта
      }} 
      className={styles['ExampleFormProducts']}
    >
      <div className={styles['productImageContainer']}>
        <img src={image} alt={name} className={styles['productImage']} />
      </div>
      <p className={styles['productTitle']}>{name}</p>
      <p className={styles['productPrice']}>₸{price}</p>
      <p className={styles['productCategory']}>{category}</p>
      <button className={styles['buttonPassive']} disabled={!inStock}>
        {inStock ? 'Add to Cart' : 'Out of Stock'}
      </button>
      {bestSeller && <span className={styles['bestSellerBadge']}>Best Seller</span>}
      {recommendation && <span className={styles['recommendationBadge']}>Recommended</span>}
      <p className={styles['productDescription']}>{description}</p>
      {comments && comments.length > 0 && (
        <div className={styles['commentsContainer']}>
          <h4>Comments:</h4>
          {comments.map((comment, index) => (
            <div key={index} className={styles['comment']}>
              <p className={styles['commentUser']}>{comment.user}:</p>
              <p className={styles['commentText']}>{comment.comment}</p>
              <p className={styles['commentRating']}>Rating: {comment.rating}★</p>
            </div>
          ))}
        </div>
      )}
    </Link>
  );
};

export default Card;

