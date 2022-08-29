const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const leaveEmployeeSchema = new mongoose.Schema({

    name: {
         type: String 
        },
    fromDate: {
        type: Date,
        default: Date.now()
    },
    toDate: {
        type: Date,
        default: Date.now()
    },
    remark: {
        type: String
    }

}, { timestamps: true }
)

module.exports = mongoose.model("leaveEmployee", leaveEmployeeSchema)