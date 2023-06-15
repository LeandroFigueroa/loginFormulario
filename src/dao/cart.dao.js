import mongoose from 'mongoose';
import { cartModel } from './models/cart.model.js';
import { updateProduct } from './products.dao.js';

export const getCart = async () => {
  try {
    return await cartModel.find({});
  } catch (error) {
    console.log(error);
  }
}

export const createCart = async () => {
  try {
    const cart = new cartModel();
    return await cart.save();
  } catch (error) {
    console.log(error);
  }
}

export const getCartById = async (id) => {
  try {
    const cart = await cartModel.findById(id);
    return cart;
  } catch (error) {
    console.log(error);
  }
}


export const addProductToCart = async (id, product) => {
  try {
    const cart = await cartModel.findById(id);
    cart.carrito.push(product);
    return await cart.save();
  } catch (error) {
    console.log(error);
  }
}

export const deleteProductFromCart = async (id, productId) => {
  try {
    const cart = await cartModel.findById(id);
    const productIndex = cart.carrito.findIndex(product => product._id == productId);
    cart.carrito.splice(productIndex, 1);
    return await cart.save();
  } catch (error) {
    console.log(error);
  }
}

export const deleteCart = async (id) => {
  try {
    return await cartModel.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
  }
}

export const updateProductQuantity = async (cartId, productId, quantity) => {
  try {
    const cart = await cartModel.findById(cartId);
    if (!cart) {
      throw new Error('Cart not found');
    }

    const productToUpdate = cart.carrito.find((product) => product._id.toString() === productId);
    if (!productToUpdate) {
      throw new Error('Product not found in cart');
    }

    const updatedProduct = await updateProduct(productId, { quantity }); 

    if (!updatedProduct) {
      throw new Error('Failed to update product quantity');
    }

    return cart; 
  } catch (error) {
    console.log(error);
    throw error;
  }
};