require('dotenv').config();
const express = require('express');
const path = require('path')
const bookingRouter = require('./routes/bookingRouter');
const productRouter = require('./routes/productRouter')
const viewRouter = require('./routes/viewRouter')
const app = express()
const mongoose = require('mongoose');
const bookingController = require('./controllers/bookingController');
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

//for strip webhooks. we need raw bodyparse not json parser
//otherwise it will not work. so we need to implement before express.json()
app.post('/webhooks-checkout', express.raw({type: 'application/json'}), bookingController.webhookCheckout)

// Body parser, reading data from body into req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.static(`${__dirname}/public`))

//view route
app.use('/', viewRouter)
//api route
app.use('/api/v1/booking', bookingRouter)
app.use('/api/v1/product', productRouter)

app.get('*', (req, res, next) => {
  res.status(404).send('<h1 class="text-center mt-5"> 404 | Page not found</h1>')
})

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
})