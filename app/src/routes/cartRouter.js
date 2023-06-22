import { Router } from "express";
import {
    getCartController,
    createCartController,
    addProductToCartController,
    deleteProductToCartController,
    updateQuantityOfProductController,
    deleteAllProductsToCartController
} from '../controllers/cartController.js';

const router = Router();

router.get('/', getCartController);
router.post('/', createCartController);
router.put('/:prodId', addProductToCartController);
router.put('/quantity/:prodId', updateQuantityOfProductController);
router.delete('/', deleteAllProductsToCartController);
router.delete('/:prodId', deleteProductToCartController);

export default router