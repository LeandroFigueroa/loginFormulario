import CartsDaoMongoDB from "../daos/mongodb/cartsDao.js";
import ProductsDaoMongoDB from "../daos/mongodb/productsDao.js";
const cartDao = new CartsDaoMongoDB();
const prodDao = new ProductsDaoMongoDB();

export const getCartController = async (req, res, next) =>{
    try {
        const cartId = req.session.cartId;
        if(!cartId){ 
            res.redirect('/views/login')
        }else{
            const cart = await cartDao.getCart(cartId);
            res.render('carts', {cart});
        }
    } catch (error) {
        next(error)
    };
};
export const createCartController = async (req, res, next) =>{
    try {
        const newCart = await cartDao.createCart()
        res.json(newCart)
    } catch (error) {
        next(error)
    };
};
export const addProductToCartController = async (req, res, next) =>{
    try {
        const cartId = req.session.cartId;
        const prodId = req.params.prodId;
        const existenceValidator = await prodDao.getProductById(prodId)
        if(existenceValidator){
            const prodAdded = await cartDao.addProductToCart(prodId, cartId);
            res.json(prodAdded);
        } else{
            res.status(404).json('El producto es inexistente')
        }
    } catch (error) {
        next(error)
    };
};
export const deleteProductToCartController = async (req, res, next) =>{
    try {
        const cartId = req.session.cartId;
        const prodId = req.params.prodId;
        const prodDelete = await cartDao.deleteProductToCart(prodId, cartId)
        if(prodDelete){
            res.json(prodDelete);
        } else{
            res.status(404).json('El producto que intenta eliminar no existe')
        }
    } catch (error) {
        next(error)
    };
};
export const deleteAllProductsToCartController = async (req, res, next) =>{
    try {
        const cartId = req.session.cartId;
        const cartToDelete = await cartDao.deleteAllProductsToCart(cartId)

            res.json(`cart con el ID ${cartId} eliminado correctamente`)
    } catch (error) {
        next(error)
    };
};
export const updateQuantityOfProductController = async (req, res, next) =>{
    try {
        const cartId = req.session.cartId;
        const prodId = req.params.prodId;
        const newQuantity = req.body.quantity;
        const updatedProd = await cartDao.updateQuantityOfProduct(cartId, prodId, newQuantity)
        if(updatedProd){
            res.json(updatedProd);
        } else{
            res.status(404).json('El producto que intenta eliminar no existe')
        }
    } catch (error) {
        next(error)
    };
};