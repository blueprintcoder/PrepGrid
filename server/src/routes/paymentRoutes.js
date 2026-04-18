import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import User from '../models/User.js';

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * Create Razorpay Order
 */
router.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body; // Amount in paise (e.g., 49900 for ₹499)
    
    const options = {
      amount: amount,
      currency: "INR",
      receipt: `receipt_${Math.random().toString(36).substring(7)}`,
    };

    const order = await razorpay.orders.create(options);
    
    res.status(200).json(order);
  } catch (error) {
    console.error('[Razorpay Create Order Error]:', error);
    res.status(500).json({ message: 'Payment initialization failed', error: error.message });
  }
});

/**
 * Verify Razorpay Payment Signature
 */
router.post('/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount } = req.body;
    let clerkId = req.auth?.userId;

    // Verify signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    if (!clerkId) {
      const latestUser = await User.findOne().sort({ createdAt: -1 });
      clerkId = latestUser.clerkId;
    }

    const user = await User.findOne({ clerkId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // SUCCESS: Update user status
    user.isPro = true;
    user.billingHistory.push({
      amount: amount / 100, // stored in rupees
      currency: 'INR',
      status: 'SUCCESS',
      transactionId: razorpay_payment_id,
      date: new Date()
    });

    await user.save();

    res.status(200).json({ 
      message: 'Payment verified successfully. Welcome to Pro Tier!',
      isPro: true 
    });
  } catch (error) {
    console.error('[Payment Verify Error]:', error);
    res.status(500).json({ message: 'Payment verification failed' });
  }
});

export default router;
