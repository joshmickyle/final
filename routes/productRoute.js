const express = require('express');
const { check, validationResult } = require('express-validator');
const Product = require('../models/productModel');
const userAuth = require('../middleware/authorisation');
const adminAuth = require('../middleware/authorisation');

const router = express.Router();

// @route   GET api/products
// @desc    get and display products
// @access  Public
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
      res.send(products)
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send('Products Not Found.');
  }
});

// @route   GET api/products/id
// @desc    display items a customer selects
// @access  Public
router.get(':id', async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
      res.send(product);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send('Product Not Found.');
  }
});

// @route   POST api/products
// @desc    add new product
// @access  Private for admin
router.post('/',

  [
    check('Product', 'Product is required')
      .not()
      .isEmpty(),
  ],

async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  const {name, price, image, material, category, numInStock, description, rating, numReviews} = req.body;
  try {
    const newProduct = new Product({
      name,
      price,
      image,
      material,
      category,
      numInStock,
      description,
      rating,
      numReviews
    });

    const product = await newProduct.save();

    res.json(product);
    res.send({ message: 'New Product Created', data: product });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(' Server Error in Creating Product.');
  }
},
);

// @route     PUT api/products/:id
// @desc      Update product
// @access    Private for admin
router.put('/:id', async (req, res) => {

  const {name, price, image, material, category, numInStock, description, rating, numReviews} = req.body;
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = name;
      product.price = price;
      product.image = image;
      product.material = material;
      product.category = category;
      product.numInStock = numInStock;
      product.description = description;
      product.rating = rating;
      product.numReviews = numReviews;
    
      const updatedProduct = await product.save();
      if (updatedProduct) {
        return res
          .status(200)
          .send({ message: 'Product Updated', data: updatedProduct });
      }
    }
  }
  catch (err) {
    console.error(err.message);
    res.status(500).send('Error in Updating Product');
  }
});

// @route     DELETE api/products/:id
// @desc      Delete product
// @access    Private for admin
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findById(req.params.id);
      await deletedProduct.remove();
      res.send({ message: 'Product Deleted' });
  }
  catch (err) {
    console.error(err.message);
    res.send('Error in Deletion of product.')
  }
});

module.exports = router;