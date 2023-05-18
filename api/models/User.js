const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        unique: true,
    },
    name: {
        type: String,
    },
    age: {
        type: Number,
    },
    nicNumber: {
        type: String,
    },
    contact: {
        type: String,
    },
    address: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    reEnterPassword: {
        type: String,
    }

});
const User = mongoose.model('User', userSchema);
const userValidationSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required(),
    nicNumber: Joi.string().required(),
    contact: Joi.string().required(),
    address: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    reEnterpassword: Joi.string().min(8).required(),


});
module.exports = {
    User,
    userValidationSchema
};