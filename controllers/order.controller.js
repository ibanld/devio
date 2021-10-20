const Order = require('../models/Order.model')

exports.findAll = async (req, res) => {
    try {
        // Procurar todos os pedidos
        const orders = await Order.findAll()
        if (!orders) {
          return  res.send({message: 'Não foram achados pedidos'})
        } else {
          return  res.send(orders)
        }
    } catch (err) {
       return res.send({message: 'Algo nao foi certo carregando os pedidos'})
    }
}

exports.findOne = async (req, res) => {
    try {
        const id = req.params.id
        // Procurar pedido com Id do pedido
        const order = await Order.findByPk(id)
        if (!order) {
           return res.send({ message: `Não foi achado nenhum pedido com ID ${id}` })
        } else {
           return res.send(order)
        }
    } catch (err) {
      return res.send({message: `Algo nao foi certo carregando o pedido com ID: ${id}`})
    }
}

exports.addOrder = async (req, res) => {
    try {
        const { customer, waiter, table, products, total } = req.body
            // Salvar novo pedido no banco de dados
            if (customer, waiter, table, products) {
                const saveOrder = await Order.create({
                    customer: customer,
                    waiter: waiter, 
                    table: table,
                    products: products,
                    total: total,
                    completed: false
                })
                // Informar que o pedido foi criado
                if (saveOrder) {
                    return res.send({ message: `Pedido na Mesa ${table} para ${cliente} foi criado || Produtos totais: ${products.length} || Total: R$ ${total}` })
                }
            } else {
                return res.send(`Algo nao foi certo criando o pedido`)
            }
    } catch (err) {
       return res.send({message: err.message})
    }
}

exports.updateOrder = async (req, res) => {
    try {
        const id = req.params.id
        // Atualizar pedido dependendo da instruçao
        switch (req.body.type) {
            case 'ADD_PRODUCT':
                return res.send(`Produto foi adicionado para pedido ${id}`)
            case 'DELETE_PRODUCT':
                return res.send(`Produto foi excluido para pedido ${id}`)
            case 'PAYMENT_DONE':
                return res.send(`Pagamento feito para pedido ${id}`)
            case 'COMPLETED':
                return res.send(`Pedido completo || Mesa Libre`)
            default:
                return res.send(`Algo nao foi certo atualizando o pedido ${id}`)
        }
    } catch (err) {
        return res.send({message: err.message})
    }
}
