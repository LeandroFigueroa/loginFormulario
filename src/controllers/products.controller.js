import {
  getProductByIdService,
  getProductsService,
  addProductService,
  updateProductService,
  deleteProductService,
} from "../services/product.services.js";

export const getProductsController = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const products = await getProductsService(page, limit);
    let statusRes;
    products ? (statusRes = 200) : (statusRes = 404);
    res.json({
      statusRes,
      payload: products.docs,
      info: {
        totalPages: products.totalPages,
        prevPage: products.hasPrevPage ? products.prevPage : false,
        nextPage: products.hasNextPage ? products.nextPage : false,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: products.hasPrevPage
          ? `http://localhost:8080/products?page=${products.prevPage}`
          : false,
        nextLink: products.hasNextPage
          ? `http://localhost:8080/products?page=${products.nextPage}`
          : false,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getProductByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await getProductByIdService(id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const addProductController = async (req, res, next) => {
  try {
    const product = req.body;
    const newProduct = await addProductService(product);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const updateProductController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = req.body;
    const updatedProduct = await updateProductService(id, product);
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProductController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await deleteProductService(id);
    res.status(200).json(deletedProduct);
  } catch (error) {
    next(error);
  }
};
