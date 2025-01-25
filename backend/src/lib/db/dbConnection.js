import mongoose from 'mongoose'
import { envConfig } from '../configs/env.config.js';

export const dbConnect = async() => {
    try {
        await mongoose.connect(envConfig.MONGO_URI)
        console.log("db connect Successfully");
        
    } catch (error) {
        console.log("error => ",error);
        process.exit(1)
    }
}