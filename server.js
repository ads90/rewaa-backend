require('dotenv').config();
const express = require('express'); 
// create express app
const app = express();
// Setup server port
const port = process.env.PORT || 5000;
 
var bodyParser = require('body-parser');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
})
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use((req, res, next) => { 
  next();
})
 
// Require product routes
const productRoutes = require('./src/routes/product.routes')

// Require user routes
const userRoutes = require('./src/routes/user.routes')

// using as middleware
app.use('/api/v1/products', productRoutes)
app.use('/api/v1/users', userRoutes)

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});