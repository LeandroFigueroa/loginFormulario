import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firstName: {type: String, required:true},
    lastName: {type: String, required:true},
    email: {type: String, required:true, unique: true},
    age: {type: Number, required:true},
    password: {type:String, required:true, index:true},
    role: {type:String, default:'user'}
});

export const UserModel = mongoose.model(
    'users',
    UserSchema
);