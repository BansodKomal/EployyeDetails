const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const EmployeeSchema = new mongoose.Schema({

    name: {
        type: String,
       // required: true
    },
    address: {
        type: String,
       // required: true
    },
    phone: {
        type: Number,
       // required: true,
       // unique: true
    },
    joiningDate: {
        type: Date,
       // required: true,
        dafault: Date.now()

    },
    contract: {
        type: Number
    },
    documents: {
        type: Array,
        //npm irequired: true
    },
    wfoWfh: {
        type: String
    },
    assets:{
        type:String
    },
    salary: {
        type: Number,
       // required: true
    },
    documentsId:{
        type:String,
        default:""
      
    }
}, { timestamps: true }
)

module.exports = mongoose.model("Employee", EmployeeSchema)