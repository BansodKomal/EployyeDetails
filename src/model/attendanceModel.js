const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const AttendanceSchema= new mongoose.Schema({

    date:{
        type:Date,
        default:Date.now()
    },
    
    
}, { timestamps: true }
)

module.exports = mongoose.model("Attendance", AttendanceSchema)