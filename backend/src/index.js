import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config'
import process from 'process';
import cookieParser from "cookie-parser"
import fs from "fs";

//utils
import connectDB from './database/index.js';
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import typeRoutes from './routes/typeRouter.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';


const app=express();
//Middleware
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
    
}));
app.use (express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

dotenv.config({
});

// Routes
app.use('/api/users',userRoutes);
app.use('/api/category',categoryRoutes);
app.use('/api/types',typeRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

const __dirname=path.resolve();
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
app.use("/uploads", express.static(uploadsDir));

// Server
const PORT= process.env.PORT || 5000;
connectDB().then(() => {
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})})
.catch((err) => {
    console.error('Error connecting to database:', err);
    process.exit(1);
});