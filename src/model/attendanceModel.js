const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const AttendanceSchema = new mongoose.Schema({

    date: {
        type: String,
        required:true,
    },
    employeeId: {
        type: ObjectId,
        required:true,
        ref: "Employee"

    },
    inTime: {
        type: String,
        required:true,
    },
    outTime: {
        type: String
    }


}, { timestamps: true }
)

module.exports = mongoose.model("Attendance", AttendanceSchema)