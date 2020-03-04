const User = require("../models/Users");

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
        const token = await user.generateAuthToken(); // here it is calling the method that we created in the model
        res.status(201).json({ data, token });
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
        const token = await user.generateAuthToken();
        res.status(201).json({ user, token });
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
};

exports.getUserDetails = async (req, res) => {
    await res.json(req.userData);
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