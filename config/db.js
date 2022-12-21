import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config()

const dbENV = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME
}

const db = async () => {
    await mongoose.connect(`mongodb://${dbENV.username}:${dbENV.password}@${dbENV.host}:${dbENV.port}/${dbENV.dbName}?authSource=admin`, {});
}

export default db