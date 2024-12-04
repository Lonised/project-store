import mongoose from 'mongoose';

// Создание схемы для продукта
const productSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  inStock: { type: Boolean, required: true },
  image: { type: String, required: true },
  bestSeller: { type: Boolean, required: true },
  quantity: { type: Number, required: true },
  recommendation: { type: Boolean, required: true },
  description: { type: String, required: true },
  comments: [{
    user: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true }
  }]
});

const Product = mongoose.model('Product', productSchema);

export default Product;
