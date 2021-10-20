import mongoose from 'mongoose'
const { Schema } = mongoose

const orderSchema = new Schema({
    customer: {
        type: String, 
        required: false
    },
    waiter: {
        type: String,
        required: true
    },
    table: {
        type: Number,
        required: true
    },
    products: {
        type: Array,
        required: true
    },
    payment: {
        type: Number,
    },
    paymentMethod: {
        type: Boolean,
    },
    paymentChange: {
        type: Number,
        default: 0
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true })

const Order = mongoose.model('Order', orderSchema)

module.exports = Order