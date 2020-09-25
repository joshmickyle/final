const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const config = require('config');

// @route   POST api/register
// @desc    For submitting user data to database for register purposes.
// @access  Public
router.post('/register', 
[
    check('name', 'Please add Fullname.').not().isEmpty(),
    check('email','Please include a valid email.').isEmail(),
    check('password', 'Please enter a password with 6 or more characters.').isLength({min: 6})
],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if (user) {
            return res.status(400).json({msg: 'User already exists'});
        }
        user = new User({
            name,
            email,
            password,
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const payload = {
            user: { id: user.id },
        };

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {expiresIn: 360000},
            (err, token) => {
                if (err) throw err;
                res.json({token});
            },
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});  

// @route   POST api/signin
// @desc    get admin
// @access  Private
router.get('/createadmin', async (req, res) => {
    try {

        const user = new User({
            name: 'Chad',
            email: 'chadhoosain@gmail.com',
            password: '123456',
            isAdmin: true,
        });

        const newUser = await user.save();
        res.send(newUser);

    } catch (error) {
        res.send({ message: error.message });
    }
});

module.exports = router;