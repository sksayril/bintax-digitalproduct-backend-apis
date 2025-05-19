const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/Payment');

const razorpay = new Razorpay({
  key_id: 'rzp_test_Oy62IkchWuGtwR', // Replace with your Razorpay Key ID
  key_secret: 'UuOSFGrJGd3GdYwTxvLRC1YU', // Replace with your Razorpay Key Secret
});

exports.createOrder = async (req, res) => {
  const { amount, productId, customerId } = req.body;

  if (!amount || !productId || !customerId) {
    return res.status(400).json({ error: 'Amount, productId, and customerId are required' });
  }

  const options = {
    amount: amount * 100, // Convert to paise
    currency: 'INR',
    receipt: `receipt_${Date.now()}`,
    payment_capture: 1,
  };

  try {
    const order = await razorpay.orders.create(options);
    const payment = new Payment({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      status: 'created',
      productId,
      customerId,
    });
    await payment.save();
    res.json({
      key: 'rzp_test_Oy62IkchWuGtwR',
      amount: order.amount,
      currency: order.currency,
      id: order.id,
      productId,
      customerId,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Unable to create order' });
  }
};

exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const key_secret = 'UuOSFGrJGd3GdYwTxvLRC1YU';

  const generated_signature = crypto
    .createHmac('sha256', key_secret)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');

  if (generated_signature === razorpay_signature) {
    await Payment.findOneAndUpdate(
      { orderId: razorpay_order_id },
      {
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
        status: 'verified',
      }
    );
    res.json({ status: 'success', message: 'Payment verified successfully' });
  } else {
    await Payment.findOneAndUpdate(
      { orderId: razorpay_order_id },
      { status: 'failed' }
    );
    res.status(400).json({ status: 'failed', message: 'Invalid signature' });
  }
};