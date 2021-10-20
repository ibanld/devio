const Order = require('../models/Order.model')

exports.findAll = async (req, res) => {
    try {
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
        const order = await Order.findByPk(id)
        if (!order) {
           return res.send({ message: `Não foi achado nenhum pedido com ID ${id}` })
        } else {
           return res.send({ message: order })
        }
    } catch (err) {
      return res.send({message: `Algo nao foi certo carregando o pedido com ID: ${id}`})
    }
}

exports.addUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email) {
           return res.send({ message: 'Email is missing' })
        }
        if (!password) {
            return res.send({ message: 'Password is missing' })
        }

        if (email && password) {
            // Check if user is already in the database
            const myUser = await User.findOne({where: { email: email }})
            if (myUser) {
                return res.send({ message: `Usuário com E-Mail ${email} já está cadastrado`})
            } else {
                // Check if E-Mail provided has a valid format
                const validEmail = validateMail(email)
                if (validEmail) {
                    // Encrypt User password before saving
                    const hash = bcrypt.hashSync(password, 10)
                    // Save User into DB
                    const saveUser = await User.create({
                       email: email,
                       senha: hash
                    })
                    // Inform User was created
                    if (saveUser) {
                        return res.send({ message: `Usuário com E-Mail: ${email} foi criado` })
                    }
                } else {
                    return res.send({ message: `${email} não é um E-Mail válido!` })
                }
            }
        } 

    } catch (err) {
       return res.send({message: err.message})
    }
}
