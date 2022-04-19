const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.getCheckoutSession = async (req, res, next) => {
  try {
    //1) Get the currently booked tour by params id
    // const tour = await Tour.findById(req.params.tourId)

    const tour = {
      name: "Cox's Bazar",
      price: 100,
      desc: 'this is test tour description',
      slug: ''
    }

    //2) Create checkout session
    //note: when payment is success. we can get back session again.
    //
    const sessions = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      success_url: `${req.protocol}://${req.get('host')}/`, // http :// localhost:8800
      cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slag}`,
      // customer_email: req.user.email,
      customer_email: 'test@gmail.com',
      // client_reference_id: req.params.tourId, //will help save the information into DB
      client_reference_id: req.params.tourId,

      //product details: //all these field from stripe
      line_items:[
        {
          name: `${tour.name} Tour`, 
          description: `${tour.desc}`,
          // images: [],
          amount: tour.price * 100, // dollar to cent (1 dollar = 100 cents)
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