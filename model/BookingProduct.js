const mongoose = require('mongoose');

const bookingProductSchema = new mongoose.Schema({
  product:{
    type: mongoose.Types.ObjectId,
    ref: 'product',
    required: [true, 'Must have product']
  },
  user: {
    type: String,
    required: [true, 'User is required']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required']
  },
  paid: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

bookingProductSchema.pre(/^find/, function(next){
  this.populate('product', 'name price')
})

module.exports = mongoose.model('BookingProduct', bookingProductSchema)