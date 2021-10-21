const User = require('../models/User.model')
const bcrypt = require('bcryptjs')

exports.addUser = async (req, res) => {
    try {
        const { user, fullName, password, role } = req.body
        if (user, fullName, password, role) {
            var hash = bcrypt.hashSync(password, 10)
            const newUser = await User.create({
                user: user,
                fullName: fullName,
                password: hash,
                role: role
            })
            if (newUser) {
                return res.send({ 
                    message: `Usuario ${user} foi adicionado`,
                    data: newUser
                })
            }
        }
    } catch (err) {
        return res.send({message: err.message})
    }
}

exports.login = async (req, res) => {
    try {
        const { user, password } = req.body
        const findUser = await User.find({ user: user })
        if (findUser) {
            const checkPassword = bcrypt.compareSync(password, findUser.password)
            if (checkPassword) {
                return res.send({
                    message: 'Login deu certo!',
                    data: findUser.data
                })
            } else {
                return res.send({
                    message: 'Senha incorrecta!'
                })
            }
        } else {
            return res.send({
                message: 'Usuario incorrecto!'
            })
        }
    } catch (err) {
        return res.send({message: err.message})
    }
}

exports.getUsers = async (req, res) => {
    try {
        const getUsers = await User.find()
        if (getUsers) {
            return res.send({
                message: 'Usuarios carregados',
                data: getUsers
            })
        }
    } catch (err) {
        return res.send({message: err.message})
    }
}

exports.deleteUsers = async (req, res) => {
    try {
        const id = req.params.id
        const delUser = await User.findByIdAndDelete(id)
        if (delUser) {
            return res.send({message: 'Usuario foi excluido!'})
        }
    } catch (err) {
        return res.send({message: err.message})
    }
}