const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);
const jwt = require('jsonwebtoken');

 
 const userSchema = new mongoose.Schema({
    firstname: {
       type: String,
       required: true,
       minlength: 3,
       maxlength: 255
    },
    lastname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
     },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
        
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024        
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});
 
 const User = mongoose.model('User', userSchema);
 
 const orderSchema = new mongoose.Schema({
    size: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 6
    },
    crust: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 11
    },
    cheese: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 7
    },
    meats: {
        type: String,
        minlength: 8,
        maxlength: 255
    },
    veggies: {
        type: String,
        minlength: 10,
        maxlength: 255
    },
    wings: {
        type: String,
        minlength: 8,
        maxlength: 255
    },
    breadsticks: {
        type: String,
        minlength: 13,
        maxlength: 255
    },
    drinks: {
        type: String,
        minlength: 4,
        maxlength: 60
    },
    total: {
        type: Number,
        required: true
    },
    user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
    }
 });
 
 const Order = mongoose.model('Order', orderSchema);
 
 function validateUsers(users) {
    const schema = {
        firstname: Joi.string().min(3).max(255).required(),
        lastname: Joi.string().min(3).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        isAdmin: Joi.boolean()
    };
      return Joi.validate(users, schema);
 }
 
 function validateOrders(orders) {
    const schema = {
        size: Joi.string().min(5).max(6).required(),
        crust: Joi.string().min(4).max(11).required(),
        cheese: Joi.string().min(5).max(7).required(),
        meats: Joi.string().min(8).max(255),
        veggies: Joi.string().min(10).max(255),
        wings: Joi.string().min(8).max(255),
        breadsticks: Joi.string().min(13).max(255),
        drinks: Joi.string().min(4).max(60),
        total: Joi.number().required(),
        user: Joi.objectid().required()
    };
        return Joi.validate(orders, schema);
 }
 
 exports.validateUsers = validateUsers;
 exports.validateOrders = validateOrders;
 exports.User = User;
 exports.Order = Order;