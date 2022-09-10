const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const ExpenseSchema = new mongoose.Schema({

   category: {
      type: String,
      required: true,
   },
   amount: {
      type: Number,
      required: true,
   },
   date: {
      type: String
   },
   remark: {
      type: String
   }
}, { timestamps: true }
)

module.exports = mongoose.model("expense", ExpenseSchema)