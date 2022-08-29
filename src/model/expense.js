const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const ExpenseSchema= new mongoose.Schema({

 category:{
    type:Strning,
    
    
 },
 amount:{
    type:Number
 }, 
 date:{
    type:Date
 },
 remark:{
    type:String
 }
    
    
}, { timestamps: true }
)

module.exports = mongoose.model("expense", ExpenseSchema)