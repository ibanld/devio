const mongoose = require("mongoose")
const { Schema } = mongoose

const productSchema = new Schema({
   item: {
       type: String, 
       required: true
   },
   family: {
       type: String,
       required: true
   },
   price: {
       type: Number, 
       required: true
   },
   sold: {
       type: Number,
       required: true,
       default: 0
   }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product