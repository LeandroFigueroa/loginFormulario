import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productsSchema = new mongoose.Schema({
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    price: { type:Number, required: true },
    stock: { type:Number, required: true },
    code: { type:String, required: true, unique: true, maxLength: 6 },
    category: { type:String, required: true, index: true},
    size: { type:String, required:true, index: true}
});

productsSchema.plugin(mongoosePaginate);

export const ProductsModel = mongoose.model(
    'products',
    productsSchema 
);