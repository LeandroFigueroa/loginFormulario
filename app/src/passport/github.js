import { Strategy as GithubStrategy } from 'passport-github2';
import passport from 'passport';
import UserDao from '../daos/mongodb/usersDao.js';
const userDao = new UserDao();
import CartsDaoMongoDB from "../daos/mongodb/cartsDao.js";
const cartDao = new CartsDaoMongoDB();

const strategyOptions = {
    clientID : 'Iv1.9bc6eb5e06e707c9',
    clientSecret: '78c15426ddf12e38dfab579629c62d5ec69c0dc6',
    callbackURL:'http://localhost:8080/user/github-profile'
};

const registerOrLogin = async(accessToken, refreshToken, profile, done) => {
    try {
        const email = profile._json.email
        const user = await userDao.getUserByEmail(email);
        if(user) {
            return done(null, user)
        }else {
            const newCart = await cartDao.createCart()
            const cartId = newCart._id
            const newUser = await userDao.createUser({
                firstName : profile._json.name.split(' ')[0],
                lastName: profile._json.name.split(' ')[1],
                email: email,
                password: '',
                isGithub: true,
                cartId: cartId
            });
            return done(null, newUser)
        };
    } catch (error) {
        console.log(error)
    }
};

passport.use('github', new GithubStrategy(strategyOptions, registerOrLogin));

export const frontResponseGithub = {
    failureRedirect: '/views/register/Error',
    successRedirect: '/views/github-profile',
    passReqToCallback: true,
};