const Product = require('../model/Product')

exports.readAll = async (req, res, next) => {
  try {
    const products = await Product.find({})
    res.status(200).render('product', {title:"All Product", products})
  } catch (err) {
    console.log(err);
  }
}