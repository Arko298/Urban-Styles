import { raw } from 'body-parser';
import mongoose, { Schema } from 'mongoose';

const reviewSchema= new Schema({
    name: {type:String,required:true},
    rating:{type:Number,required:true},
    comment:{type:String,required:true},
    user:{type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
},
{timestamps:true});

const productSchema = new Schema({
    name: {type:String,required:true},
    price: {type:Number,required:true},
    description: {type:String,required:true},
    category: {type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    reviews: [reviewSchema],
    numReview:{type:Number,required:true},
    avgRating:{type:Number,required:true},
    stock: {type:Number,required:true},
    image: {type:String,required:true},
    stockCount: {type:Number,required:true},
    soldCount:{type:Number,required:true},
    
},
{timestamp:true});

const Product= mongoose.model('Product',productSchema);
export default Product;
