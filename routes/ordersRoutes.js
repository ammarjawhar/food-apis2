import express from 'express';
import { placeOrder } from '../controllers/orderControllers.js';
import AuthMiddleware from '../middleware/Authmiddleware.js';

const orderRouter = express.Router();

orderRouter.post('/place', AuthMiddleware, placeOrder);
export default orderRouter;
