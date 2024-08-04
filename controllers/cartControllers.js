import userModel from '../models/userModel.js';

const addToCart = async (req, res) => {
  try {
    const userData = await userModel.findOne({ _id: req.body.userId });
    const cartData = await userData.cartData;
    if (!cartData[req.body.id]) {
      cartData[req.body.id] = 1;
    } else {
      cartData[req.body.id] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.status(200).json({ success: true, message: 'Item added to cart' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'ERROR' });
  }
};
const removeFromCart = async (req, res) => {
  try {
    const userData = await userModel.findOne({ _id: req.body.userId });
    const cartData = await userData.cartData;
    if (cartData[req.body.id] > 0) {
      cartData[req.body.id] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'ERROR' });
  }
};
const getCArt = async (req, res) => {
  try {
    const userData = await userModel.findOne({ _id: req.body.userId });
    res.status(200).json({ success: true, data: userData.cartData });
  } catch (err) {
    res.status(500).json({ success: false, message: 'ERROR' });
  }
};

export { addToCart, removeFromCart, getCArt };
