const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please enter you name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please enter you email address'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: 8,
        unique: true,
        trim: true,
        select: false
    },
    role: {
        type: String,
        enum: ['user', 'customer', 'admin'],
        default: 'user'
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    active: {
        type: Boolean,
        default: true,
        select: false
    }
});

//==== Comment out this section of code to load test data ============//
// userSchema.pre('save', async function (next) {
//     // Only runs if password was modified
//     if (!this.isModified('password')) return next();
//     // Hash password
//     this.password = await bcrypt.hash(this.password, 12);
//     // Delete confimPassord field before persisting to the database
//     this.confirmPassword = undefined;
//     next();
// });

// userSchema.pre('save', function (next) {
//     if (!this.isModified('password') || this.isNew) return next();

//     this.passwordChangedAt = Date.now() - 1000;
//     next();
// });
//======================================//

//this method will hash the password before saving the user model
userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});

//this method generates an auth token for the user
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id, name: user.name, email: user.email },
        "secret");
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

//this method search for a user by email and password.
// userSchema.statics.findByCredentials = async (email, password) => {
//     const user = await User.findOne({ email });
//     if (!user) {
//         throw new Error({ error: "Email does not match any of our records " });
//     }
//     const isPasswordMatch = await bcrypt.compare(password, user.password);
//     if (!isPasswordMatch) {
//         throw new Error({ error: "Password is incorrect" });
//     }
//     return user;
// };

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;