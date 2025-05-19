const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  purchasePrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  driveLink: { type: String, required: true },
});

module.exports = mongoose.model('Product', productSchema);