import { ProductModel } from './models/products.model.js'

export const getProducts = async (page = 1, limit = 2) => {
    try {
        const response = await ProductModel.paginate({}, { page, limit });
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getProductById = async (id) => {
    try {
        return await ProductModel.findById(id);
    } catch (error) {
        console.log(error);
    }
}

export const addProduct = async (product) => {
    try {
        return await ProductModel.create(product);
    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = async (id, product) => {
    try {
      return await ProductModel.findByIdAndUpdate({ _id: id }, product, { new: true });
    } catch (error) {
      console.log(error);
    }
  };

export const deleteProduct = async (id) => {
    try {
        return await ProductModel.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
    }
}