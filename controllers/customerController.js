const Customer = require('../models/Customer');

exports.addCustomer = async (req, res) => {
  const { name, phone, email } = req.body;

  if (!name || !phone || !email) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const customer = new Customer({
      name,
      phone,
      email,
    });
    await customer.save();
    res.status(201).json({ message: 'Customer added successfully', customer });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add customer' });
  }
};