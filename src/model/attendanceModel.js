const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const AttendanceSchema = new mongoose.Schema({

    date: {
        type: Date,
        // required: true,
    },
    employeeId: {
        type: ObjectId,
        //  required:true,
        ref: "Employee"

    },
    name: {
        type: String
    },
    inTime: {
        type: Date,
        default: null
    },
    outTime: {
        type: Date,
        default: null
    }


}, { timestamps: true }
)

module.exports = mongoose.model("Attendance", AttendanceSchema)