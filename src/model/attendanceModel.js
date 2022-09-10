const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const AttendanceSchema = new mongoose.Schema({

    date: {
        type: String,
        // required: true,
    },
    employeeId: {
        type: ObjectId,
        //  required:true,
        ref: "Employee"

    },
    name:{
type:String
    },
    inTime: {
        type: String,
        default: null
    },
    outTime: {
        type: String,
        default: null
    }


}, { timestamps: true }
)

module.exports = mongoose.model("Attendance", AttendanceSchema)