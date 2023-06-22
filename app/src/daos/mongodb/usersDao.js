import {UserModel} from './models/usersModel.js'

export default class UsersDaoMongoDB {
    async createUser (userData) {
        try {
            const newUser = await UserModel.create(userData);
            return newUser
        } catch (error) {
            console.log(error)
        }
    };
    async loginUser (userData) {
        try {
            const email = userData.email
            const password = userData.password
            const find = await UserModel.findOne({ email: email, password: password });
            if(!find){
                return null
            } else{
                return find
            }
        } catch (error) {
            console.log(error)
        }
    };
};