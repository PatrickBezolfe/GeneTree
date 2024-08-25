const mongoose = require('mongoose');
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

module.exports = mongoose;
