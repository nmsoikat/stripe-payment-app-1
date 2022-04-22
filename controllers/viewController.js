const Product = require('../model/Product')
const BookingProduct = require('../model/BookingProduct')

exports.readAll = async (req, res, next) => {
  try {
    const products = await Product.find({})
    res.status(200).render('product', {title:"All Product", products})
  } catch (err) {
    console.log(err);
  }
}

exports.readAllBooking = async (req, res, next) => {
  try {
    const bookingProducts = await BookingProduct.find({})
    res.status(200).render('allBooking', {title:"All Booking Product", bookingProducts})
  } catch (err) {
    console.log(err);
  }
}