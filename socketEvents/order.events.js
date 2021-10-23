const Order = require('../models/Order.model')

exports.findAll = async () => {
    try {
        // Procurar todos os pedidos
        const orders = await Order.find()
        if (orders.length < 1) {
          return  ({message: 'Não foram achados pedidos'})
        } else {
          return orders
        }
    } catch (err) {
       console.error(err)
    }
}
