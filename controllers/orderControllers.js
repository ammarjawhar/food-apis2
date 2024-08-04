import orderModel from '../models/ordersModel.js';
import userModel from '../models/userModel.js';
import Stripe from 'stripe';

const stripeGateway = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  const frontEnd_url = 'http://localhost:5173';

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, {
      $set: { cartData: {} },
    });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    console.log(line_items);
    line_items.push({
      price_data: {
        currency: 'usd',
        product_data: { name: 'Delivery fee' },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });

    const session = await stripeGateway.checkout.sessions.create({
      line_items: line_items,
      mode: 'payment',
      success_url: `${frontEnd_url}/verify?success=true&orderId=${newOrder.id}`,
      cancel_url: `${frontEnd_url}/verify?cancel=true&orderId=${newOrder.id}`,
    });

    res.status(200).json({ success: true, session_url: session.url });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};

export { placeOrder };
