const Product = require('../model/Product')

exports.createProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body)
  
    const newProduct = await product.save();
    res.status(200).json(newProduct)

  } catch (err) {
    console.log(err);
  }
}

exports.readAll = async (req, res, next) => {
  try {
    const products = await Product.find({})
    res.status(200).json(products)
    // res.status(200).render('product', {products})
  } catch (err) {
    console.log(err);
  }
}

exports.readById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    res.status(200).json(product)
  } catch (err) {
    console.log(err);
  }
}