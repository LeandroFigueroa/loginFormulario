import UsersDaoMongoDB from "../daos/mongodb/usersDao.js";
const userDao = new UsersDaoMongoDB();
import CartsDaoMongoDB from "../daos/mongodb/cartsDao.js";
const cartDao = new CartsDaoMongoDB();

export const renderRegisterController = async(req, res, next) =>{
    try {
        res.render('register');
    } catch (error) {
        next(error)
    };
};
export const renderLoginController = async(req, res, next) =>{
    try {
        res.render('login');
    } catch (error) {
        next(error)
    };
};
export const renderRegisterErrorController = async(req, res, next) =>{
    try {
        res.render('registerError');
    } catch (error) {
        next(error)
    };
};
export const renderLoginErrorController = async(req, res, next) =>{
    try {
        res.render('loginError');
    } catch (error) {
        next(error)
    };
};
export const createUserController = async (req, res, next) =>{
    try {
        const { email, password } = req.body
        const userData = req.body
        let create = null
        if(email === 'adminCoder@coder.com' && password === 'adminCoder123'){
            userData.role = 'admin'
            create = await userDao.createUser(userData)
        } else {
            create = await userDao.createUser(userData)
        }
        if(!create){
            res.status(404).redirect('/views/register/error')
        } else {
            req.session.email = userData.email;
            req.session.firstName = userData.firstName;
            req.session.lastName = userData.lastName;
            req.session.cartId = userData.password;
            res.status(304).redirect('/views/login');
        };
    } catch (error) {
        next()
    };
};
export const loginUserController = async (req, res, next) =>{
    try {
        const userData = req.body
        const validate = await userDao.loginUser(userData)
        if(!validate){
            res.status(404).redirect('/views/login/error')
        } else {
            const cartId = req.session.cartId
            if(!cartId){
                const createCart = await cartDao.createCart()
                req.session.cartId = createCart._id
                req.session.userData = validate
            }
        res.status(304).redirect('/products');
        } 
    } catch (error) {
        next(error)
    };
};
export const logoutUserController = async (req, res, next) =>{
    try {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            } else{
                res.redirect('/views/login');
            };
        });
    } catch (error) {
        next(error)
    }
};