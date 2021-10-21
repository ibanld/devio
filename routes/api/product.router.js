const router = require('express').Router()
const products = require('../../controllers/product.controller')

//  @route      POST /api/products
//  @access     public
//  @desc       Add new Product
router.post('/', products.addProduct)

//  @route      GET /api/products
//  @access     public
//  @desc       Retrieve all products
router.get('/', products.getAll)

//  @route      GET /api/products/:id
//  @access     public
//  @desc       Retrieve Product
router.get('/:id', products.getOne)

// @route       PUT /api/products/:id
// @access      public
// @desc        Update Product
router.put('/:id', products.updateOne)

//  @route      DELETE /api/products/:id
//  @access     public
//  @desc       Delete Product by ID
router.delete('/:id', products.deleteOne)

module.exports = router