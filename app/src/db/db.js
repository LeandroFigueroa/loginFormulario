import mongoose from 'mongoose'
const connectionString = 'mongodb+srv://admin:Kyuba2389@backend.bi0kmfo.mongodb.net/?retryWrites=true&w=majority'


try {
    await mongoose.connect(connectionString);
    console.log('Conectado a MongoDB');
} catch (error) {
    console.log(error);
}