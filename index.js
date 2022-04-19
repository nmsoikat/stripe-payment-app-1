require('dotenv').config();
const express = require('express');
const path = require('path')
const bookingRouter = require('./routes/bookingRouter');
const app = express()

app.use(express.static(`${__dirname}/public`))

app.use('/booking', bookingRouter)

app.get('/', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'view', 'index.html'))
})

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
})