const router = require('express').Router()
const users = require('../../controllers/user.controller')

//  @route      POST /api/register
//  @access     public
//  @desc       Register user
router.post('/register', users.addUser)

//  @route      POST /api/users/login
//  @access     public
//  @desc       Login user
router.post('/login', users.login)

//  @route      GET /api/users
//  @access     public
//  @desc       Retrieve all users
router.get('/', users.getUsers)

//  @route      GET /api/users/:id
//  @access     public
//  @desc       Retrieve User
router.get('/:id', users.getUser)

//  @route      DELETE /api/:id
//  @access     public
//  @desc       Delete User by ID
router.delete('/:id', users.deleteUser)