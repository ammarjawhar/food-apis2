import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDb } from './config/db.js';
import foodRouter from './routes/foodRoutes.js';
import userRouter from './routes/userRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/ordersRoutes.js';
// app config
const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
//middleware
app.use(express.json());
app.use(cors());
//db config
connectDb();
//api routes
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'));
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
//listener
app.get('/', (req, res) => {
  res.send('API is working');
});
app.listen(port, (req, res) => {
  console.log(`server started on http://localhost:${port}`);
});
