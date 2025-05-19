const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
  const { name, imageUrl, description, originalPrice, purchasePrice,driveLink } = req.body;

  if (!name || !imageUrl || !description || !originalPrice || !purchasePrice || !driveLink) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const product = new Product({
      name,
      imageUrl,
      description,
      originalPrice,
      purchasePrice,
      driveLink,
    });
    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};