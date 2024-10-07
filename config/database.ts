import mongoose from 'mongoose';

let connected = false;

const connectDB = async () => {
    if (connected) {
        console.log('Already connected to MongoDB');
        return;
    }

    try {
        mongoose.set('strictQuery', true);
        if (process.env.MONGODB_URI !== undefined) {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log('Connected to MongoDB');
            connected = true;
        }
    } catch
        (err) {
        console.error(err);
    }
}

export default connectDB;
