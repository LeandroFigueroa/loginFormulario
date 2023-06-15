import mongoose from 'mongoose';

const connectionString = 'mongodb+srv://admin:admin@backend.bi0kmfo.mongodb.net/?retryWrites=true&w=majority'

try {
  await mongoose.connect(connectionString);
  console.log('Conectado a la base de datos de MongoDB');
} catch (error) {
  console.log(`ERROR => ${error}`);
}