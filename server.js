const express = require('express');
const connectDB = require('./config/db');
const data = require('./data');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const authRoute = require('./routes/authRoute')
const path = require('path');


const app = express();
const PORT = process.env.PORT || 5000  // You can add a comment here why you want to use 4000.

app.listen(PORT, () => {console.log(`SERVER STARTED AT LOCALHOST:${PORT}`)});

// Connnecting to mongoDB
connectDB();

// Init Middleware
app.use(express.json({extended:false}));

// Defining Routes.
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/userAuth', authRoute);

// getting data from the database from data.js
app.get('/api/products', (req,res) => {
    const products = data.products
        res.send(products);
});

app.get('/api/products/:id', (req,res) => {
    const productId = req.params.id;
    const product = data.products.find(x => x._id === productId)
    if(product)
        res.send(product);
    else
        res.status(404).send({msg: "Product not found."})
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('front-end/build'));
  
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'front-end', 'build', 'index.html'))
    );
}