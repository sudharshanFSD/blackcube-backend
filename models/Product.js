const mongoose = require('mongoose');

const productSchema= new mongoose.Schema({
    title:{type:String,required:true,trim:true},
    description:{type:String,required:true,trim:true},
    image:{type:String,required:true},
    likes:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
},{
    timestamps:true,
})

module.exports=mongoose.model('Product',productSchema);
