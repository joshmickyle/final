const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    material: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    numInStock: {
        type: Number,
        default: 0,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: { 
        type: Number,
        default: 0,
        required: true
    },
    numReviews: {
        type: Number,
        default: 0,
        required: true
    },
});

module.exports = mongoose.model('Product', productSchema);