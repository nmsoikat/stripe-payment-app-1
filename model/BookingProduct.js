const mongoose = require('mongoose');

const bookingProductSchema = new mongoose.Schema({
  product:{
    type: mongoose.Types.ObjectId,
    ref: 'Product',
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
  this.populate({
    path: 'product',
    select: 'name'
  })
  next();
})

module.exports = mongoose.model('BookingProduct', bookingProductSchema)