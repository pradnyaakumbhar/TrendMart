import express from 'express';
import NodeCache from 'node-cache';
import { connectDB } from './utils/features.js';
import { errorMiddleware } from './middlewares/error.js';
import { config } from 'dotenv';
import morgan from 'morgan';
import userRoute from './routes/user.js';
import productRoute from './routes/product.js';
import orderRoute from './routes/order.js';
import Stripe from 'stripe';
import cors from 'cors';

config({
  path: './.env',
});
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || '';
const stripeKey = process.env.STRIPE_KEY || '';
connectDB(mongoUri);
export const stripe = new Stripe(stripeKey);
export const myCache = new NodeCache();
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.get('/', (req, res) => {
  res.send('API working');
});

app.use('/api/v1/user', userRoute);
app.use('/api/v1/product', productRoute);
app.use('/api/v1/order', orderRoute);

app.use('/uploads', express.static('uploads'));
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`server listening on port: ${port}`);
});
