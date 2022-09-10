const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const UserSchema = new mongoose.Schema({

    name: {
        type: String
    },
    email: {
        type: String,
        required: true,

    },
    phone: {
        type: Number,
        required: true,

    },
    password: {
        type: String,
        required: true,
    }

}, { timestamps: true }
)

module.exports = mongoose.model("User", UserSchema)