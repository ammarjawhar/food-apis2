import express from 'express';
import {
  addToCart,
  removeFromCart,
  getCArt,
} from '../controllers/cartControllers.js';
import AuthMiddleware from '../middleware/Authmiddleware.js';

const cartRouter = express.Router();

cartRouter.post('/add', AuthMiddleware, addToCart);
cartRouter.post('/remove', AuthMiddleware, removeFromCart);
cartRouter.get('/get', AuthMiddleware, getCArt);
export default cartRouter;
