//const crypto = require('crypto');
//const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require("../models/Users");

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);

    res.cookie('jwt', token, {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    });
    // Remove password from output
    user.password = undefined;
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};

exports.register = async (req, res) => {
    try {
        let isUser = await User.find({ email: req.body.email });
        console.log(isUser);
        if (isUser.length >= 1) {
            return res.status(409).json({
                message: "email already in use"
            });
        }
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        let data = await user.save();
        // const token = await user.generateAuthToken(); // here it is calling the method that we created in the model
        createSendToken(user, 201, req, res);
        res.status(201).json({ data });
    } catch (err) {
        res.status(400).json({ err: err });
    }
};

exports.login = async (req, res) => {
    try {
        const {email,password } = req.body;
        if (!email || !password) {
            return res.status(401).json({ error: 'Please provide your email and password'})
        }
        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.correctPassword(password, user.password))) {
            return res
                .status(401)
                .json({ error: "Login failed! Please check that your email and password are correct" });
        }
        createSendToken(user, 200, req, res);
        //res.status(201).json({ user, token });
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
};

exports.getUserDetails = async (req, res) => {
    await res.json(req.user);
};

exports.logOut = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.status(200).json({message:'logged out'})
    } catch (error) {
        res.status(500).send(error)
    }
};
exports.logOutAll = async (req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.status(200).json({ message: 'You logged out across all of your devices' })
    } catch (error) {
        res.status(500).send(error)
    }
};



/// TODO: Used for Authorization on specific routes
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        // roles ['admin', 'lead-guide']. role='user'
        if (!roles.includes(req.user.role)) {
            return next(
                res.status(403)
                    .json({ error: 'You do not have permission to perform this action' })
            );
        }
        next();
    };
};