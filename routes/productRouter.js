const { createProduct, readAll, readById } = require("../controllers/productController")

const router = require('express').Router()

router.route('/').post(createProduct).get(readAll)
router.route('/:id').get(readById)


module.exports = router;