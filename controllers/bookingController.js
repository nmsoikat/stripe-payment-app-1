const BookingProduct = require('../model/BookingProduct')
const Product = require('../model/Product')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.getCheckoutSession = async (req, res, next) => {
  try {
    //1) Get the currently booked tour by params id
    const product = await Product.findById(req.params.productId)
    // const tour = {
    //   name: "Cox's Bazar",
    //   price: 100,
    //   desc: 'this is test tour description',
    //   slug: ''
    // }

    //2) Create checkout session
    //note: when payment is success. we can get back session again.
    
    //note: execute the createBooking middleware in success url //save to db
    const sessions = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      success_url: `${req.protocol}://${req.get('host')}/?product=${product._id}&user=testUser&price=${product.price}`, // http :// localhost:8800
      cancel_url: `${req.protocol}://${req.get('host')}/cancel`,
      // customer_email: req.user.email,
      customer_email: 'testStaticUser@gmail.com',
      // client_reference_id: req.params.tourId, //will help save the information into DB
      client_reference_id: product._id,

      //product details: //all these field from stripe
      line_items:[
        {
          name: `${product.name}`, 
          // description: `${product.desc}`,
          // images: [],
          amount: product.price * 100, // dollar to cent (1 dollar = 100 cents)
          currency: 'bdt',
          quantity: 1
        }
      ]
    })

    //3) Create session and response
    res.status(200).json({
      status: 'success',
      sessions
    })

  } catch (error) {
    console.log(error);
  }
}

exports.createProductBooking = async(req, res, next) => {
  // not secure way.//use can create booking without paying
  // we need use strip webHooks to make it secure//after deploy

  const {price, user, product} = req.query;

  if(!price && !user && !product){
    return next()
  }

  await BookingProduct.create({price, user, product})
  res.redirect(req.originalUrl.split('?')[0]);
}