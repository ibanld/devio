const Order = require('../models/Order.model')

exports.findAll = async () => {
    try {
        // Procurar todos os pedidos
        const orders = await Order.find()
        if (orders.length < 1) {
          return  []
        } else {
          return orders
        }
    } catch (err) {
       console.error(err)
    }
}
