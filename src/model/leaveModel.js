const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const leaveEmployeeSchema = new mongoose.Schema({

    name: {
         type: String,
         required:true,
        },
    fromDate: {
        type: String,
        required:true,
    },
    toDate: {
        type: String,
         required:true,
    },
    remark: {
        type: String,
        required:true,
    }

}, { timestamps: true }
)

module.exports = mongoose.model("leaveEmployee", leaveEmployeeSchema)