import mongoose from 'mongoose';  // Замените require на import
import fs from 'fs';
import path from 'path';
import Product from './models/Product'; // Путь к модели

// Подключаемся к базе данных MongoDB
mongoose.connect('mongodb://localhost:27017/game-store', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Читаем данные из файла products.json
const productsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'products.json')));

// Функция для импорта данных в MongoDB
async function importProducts() {
  try {
    await Product.deleteMany({}); // Очистить коллекцию перед добавлением новых данных
    const result = await Product.insertMany(productsData);
    console.log(`Successfully imported ${result.length} products.`);
  } catch (err) {
    console.error('Error importing products:', err);
  } finally {
    mongoose.connection.close(); // Закрыть соединение после импорта
  }
}

importProducts();
