const mongoose = require("mongoose")
const { Schema } = mongoose

const userSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String, 
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "kitchen", "room"]
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User