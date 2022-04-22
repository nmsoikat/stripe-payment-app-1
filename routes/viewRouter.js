const { readAll } = require("../controllers/viewController")

const router = require('express').Router()

router.get('/',
  // createProductBooking, 
  (req, res, next) => {
    res.status(200).render('base', { title: "Home" })
  })

router.route('/product').get(readAll)
// router.route('/:id').get(readById)


module.exports = router;