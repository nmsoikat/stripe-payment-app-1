require('dotenv').config();
const express = require('express');
const path = require('path')
const bookingRouter = require('./routes/bookingRouter');
const productRouter = require('./routes/productRouter')
const viewRouter = require('./routes/viewRouter')
const app = express()
const mongoose = require('mongoose');
const { createProductBooking } = require('./controllers/bookingController');
const compression = require('compression')

mongoose.connect(process.env.DATABASE)
  .then(() => {
    console.log('Connected to mongoDB');
  }).catch(err => {
    console.log(err);
  })

  app.use(compression()) //all text will compressed
  

  app.set('view engine', 'pug');
  app.set('views', path.join(__dirname, 'views'));

// Body parser, reading data from body into req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.static(`${__dirname}/public`))

//view route
app.use('/', viewRouter)
//api route
app.use('/api/v1/booking', bookingRouter)
app.use('/api/v1/product', productRouter)

app.get('/', createProductBooking, (req, res, next) => {
  res.status(200).render('base')
})

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
})