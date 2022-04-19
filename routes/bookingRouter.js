const { getCheckoutSession } = require('../controllers/bookingController');

const router = require('express').Router()

router.get('/checkout-session/:tourId',getCheckoutSession)

module.exports = router;