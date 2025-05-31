
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
    types: {type:mongoose.Schema.Types.ObjectId,
        ref: 'Types',
        required: true},
    reviews: [reviewSchema],
    numReview:{type:Number,default:0},
    avgRating:{type:Number},
    size: [{type: String}],
    image: {type:String},
    stockCount: {type:Number},
    soldCount:{type:Number},
    bestseller: {type: Boolean, default: false}
    
},
{timestamp:true});

const Product= mongoose.model('Product',productSchema);
export default Product;
