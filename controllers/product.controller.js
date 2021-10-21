const Product = require('../models/Product.model')

exports.addProduct = async (req, res) => {
    try {
        const { item, family, price } = req.body
        const newProduct = await Product.create({
            item: item,
            family: family,
            price: price,
            sold: 0
        }) 
        if (newProduct) {
            return res.send({ 
                message: `Produto ${item} foi adicionado`,
                data: newProduct
            })
        }
    } catch (err) {
        return res.send({ message: err.message })
    }
}

exports.getAll = async (req, res) => {
    try {
        const findProducts = await Product.find()
        if (findProducts) {
            return res.send({ 
                message: `Produtos carregados!`,
                data: findProducts
             })
        }
    } catch (err) {
        return res.send({ message: err.message })
    }
}

exports.getOne = async (req, res) => {
    try {
        const id = req.params.id
        const findProduct = await Product.findById(id)
        if (findProduct) {
            return res.send({ 
                message: 'Produto carregado',
                data: findProduct
            })
        }
    } catch (err) {
        return res.send({ message: err.message })
    }
}

exports.deleteOne = async (req, res) => {
    try {
        const id = req.params.id
        const deleteProduct = await Product.findByIdAndDelete(id)
        if (deleteProduct) {
            return res.send({
                message: `Produto com ID ${id} foi excluido`
            })
        }
    } catch (err) {
        return res.send({ message: err.message })
    }
}

exports.updateOne = async (req, res) => {
    try {
        const id = req.params.id
        const updateProduct = await Product.findByIdAndUpdate(id, req.body)
        if (updateProduct) {
            return res.send({
                message: `Produto foi atualizado`,
                data: updateProduct
            })
        }
    } catch (err) {
        return res.send({ message: err.message })
    }
}