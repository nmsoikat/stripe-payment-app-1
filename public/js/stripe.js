
window.onload = function () {
  const stripe = Stripe('pk_test_51KqICYGHXUaJzZnhOa882HwOo5CG5Qnn50Wge3MjAbTKIw7i2OUUtv9MxArHo40yfIgb2bYSjX8pPqHxnplx30rc00QSTtPw3H')

  const bookTour = (id) => {
    try {
      //1) Get the checkout sessions from the server
      fetch(`http://localhost:8800/booking/checkout-session/${id}`)
        .then(res => res.json())
        .then(async (data) => {

          //2) Automatically create the checkout form and charge the credit card
          await stripe.redirectToCheckout({
            sessionId: data.sessions.id
          })
        })


    } catch (error) {
      console.log(error);
    }
  }



  let buyBtns = document.querySelectorAll('.buyBtn')

  buyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.target.textContent = "processing..."
      const {id} = e.target.dataset;
      bookTour(id)
    })
  })

}
