const Order = require('../models/Order.model')

exports.findAll = async (req, res) => {
    try {
        // Procurar todos os pedidos
        const orders = await Order.find()
        if (orders.length < 1) {
          return  res.send({message: 'Não foram achados pedidos'})
        } else {
          return  res.send(orders)
        }
    } catch (err) {
       return res.send({message: err.message})
    }
}

exports.findOne = async (req, res) => {
    try {
        const id = req.params.id
        // Procurar pedido com Id do pedido
        const order = await Order.findById(id)
        if (!order) {
           return res.send({ message: `Não foi achado nenhum pedido com ID ${id}` })
        } else {
           return res.send(order)
        }
    } catch (err) {
      return res.send({message: err.message})
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
                // Informar que o pedido foi criado e retornar pedido
                if (saveOrder) {
                    return res.send({ 
                        message: `Pedido na Mesa ${table} para ${customer} foi criado || Produtos totais: ${products.length} || Total: R$ ${total}`,
                        data: saveOrder 
                    })
                }
            } 
    } catch (err) {
       return res.send({message: err.message})
    }
}

exports.deleteOrder = async (req, res) => {
    try {
        const id = req.params.id
        const delOrder = await Order.findByIdAndDelete(id)
        if (delOrder) {
            return res.send({message: `Pedido com ID ${id} foi exlcuido`})
        }
    } catch (err) {
        return res.send({message: err.message})
    }
}

exports.updateOrder = async (req, res) => {
    try {
        const id = req.params.id
        const order = await Order.findById(id)
        // Atualizar pedido dependendo da instruçao
        switch (req.body.type) {
            case 'ADD_PRODUCT':
                const product = req.body.product
                const updatedOrder = {
                    ...order.data,
                    products: [...order.products, product],
                    total: parseFloat(order.total) + parseFloat(product.price * product.qty)
                }
                const putOrder = await Order.findByIdAndUpdate(id, { products: updatedOrder.products, total: updatedOrder.total, completed: false  })
                if (putOrder) {
                    return res.send({
                        message: `Produto foi adicionado para pedido ${id}`,
                        data: updatedOrder
                    })
                }
            case 'PRODUCT_READY': 
                // Quando um produto no pedido esta pronto para ser pegado da cozinha
                const prodId = req.body.productId
                const myProduct = order.products.find( product => product._id === prodId)
                const productReady = {
                    ...myProduct.data,
                    ready: true
                }
                const filterMyProduct = order.products.filter( product => product._id !== productId)
                filterMyProduct.push(productReady)
                const updateReadyProductOrder = await Order.findByIdAndUpdate(id, { products: filterMyProduct })
                if (updateReadyProductOrder) {
                    return res.send({
                        message: `${myProduct.item} pronto para pegar`,
                        data: productReady
                    })
                }
            case 'DELETE_PRODUCT':
                // Excluir produto do pedido
                const productId = req.body.productId
                const findProduct = order.products.find(product => product._id === productId)
                const updProducts = order.products.filter( product => product._id !== productId)
                const newTotal = parseFloat(order.total) - parseFloat(findProduct.price*findProduct.qty)
                const updOrder = {
                    ...order.data,
                    products: updProducts,
                    total: newTotal
                }
                const delProduct = await Order.findByIdAndUpdate(id, { products: updProducts, total: newTotal })
                if (delProduct) {
                    return res.send({ 
                        message: `Produto excluido no pedido ${id}`,
                        data: updOrder
                    })
                }
            case 'UPDATE_PRODUCT_QTY':
                // Atualizar quantidade para produto no pedido
                const pid = req.body.productId
                const updatedTotal = req.body.total

                const getProduct = order.products.find(product => product._id === pid)
                const updatedProduct = {
                    ...getProduct,
                    qty: req.body.qty
                }
                const removeProduct = order.products.filter( product => product._id !== pid)
                removeProduct.push(updatedProduct)
                const updtOrder = {
                    ...order.data,
                    products: removeProduct,
                    total: updatedTotal,
                    completed: getProduct.qty > req.body.qty ? true : false
                }

                const completedStatus = getProduct.qty > req.body.qty ? true : false

                const increaseQty = await Order.findByIdAndUpdate(id, { products: removeProduct, total: updatedTotal, completed: completedStatus })
                if (increaseQty) {
                    return res.send({ 
                        message: `Quantidade atualizada para ${getProduct.item}`,
                        data:  updtOrder
                    })
                }
                case 'ORDER_COMPLETED':
                    // Pedido pronto para o garçom pegar
                    const completed = await Order.findByIdAndUpdate(id, { completed: true })
                    if (completed) {
                        return res.send({
                            message: `Pedido completo || Pega bandeixa na cozinha`
                        })
                    }
                case 'PAYMENT_DONE':
                    const method = req.body.paymentMethod
                    const change = req.body.paymentChange
                    const orderPaid = await Order.findByIdAndUpdate(id, { paymentMethod: method, paymentChange: change, payment: true })
                    if (orderPaid) {
                        return res.send({
                            message: `Pagamento feito para pedido ${id} com ${!method ? 'cartao' : 'dinheiro'}`,
                            data: {
                                ...order.data,
                                paymentMethod: method, 
                                paymentChange: change, 
                                payment: true
                            }
                        })
                    }
                case 'UPDATE_INFO':
                    const { data } = req.body
                    const updateInfo = await Order.findByIdAndUpdate(id, data )
                    if (updateInfo) {
                        return res.send({
                            message: `Pedido atualizado`,
                            data: {
                                ...order.data,
                                customer: req.body.data.customer,
                                comment: req.body.data.comment
                            }
                        })
                    }
            default:
                return res.send({ message: `Algo nao foi certo atualizando o pedido ${id}` })
        }
    } catch (err) {
        return res.send({message: err.message})
    }
}
