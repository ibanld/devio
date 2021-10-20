const router = require('express').Router()
const orders = require('../../controllers/order.controller')

//  @route      GET /api/orders
//  @access     public
//  @desc       Retrieve all orders
router.get('/', orders.findAll)

//  @route      GET /api/orders/:id
//  @access     public
//  @desc       Retrieve Order by ID
router.get('/:id', orders.findOne)

//  @route      POST /api/orders
//  @access     public
//  @desc       Save new order
router.post('/', orders.addUser)

//  @route      PUT /api/orders/:id
//  @access     public
//  @desc       Update order
router.put('/:id', verifyToken, orders.updateUser)

module.exports = router