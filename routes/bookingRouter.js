const { getCheckoutSession } = require('../controllers/bookingController');

const router = require('express').Router()

router.get('/checkout-session/:productId',getCheckoutSession)

module.exports = router;