const { readAll } = require("../controllers/viewController")

const router = require('express').Router()

router.route('/product').get(readAll)
// router.route('/:id').get(readById)


module.exports = router;