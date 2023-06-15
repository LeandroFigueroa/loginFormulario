import './db/db.js';
import express from 'express';
import morgan from 'morgan';
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(errorHandler);
app.use(morgan('dev'));

app.use('/products', productsRouter);
app.use('/cart', cartRouter);

const PORT = 8080;

app.listen(PORT, () => console.log(`🚀 10,9,8,7,6,5,4,3,2,1,0 Server running`));