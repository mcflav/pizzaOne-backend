const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const authentication = require('../routes/authentication');
const orders = require('../routes/orderRoutes');
const pizzas = require('../routes/pizzaRoutes');
const users = require('../routes/userRoutes');
const error = require('../middleware/error');


module.exports = function(app){
    app.use(express.json());
    app.use(cors());
    app.use('/api/v1/authentication', authentication);
    app.use('/api/v1/orders', orders);
    app.use('/api/v1/pizzas', pizzas);
    app.use('/api/v1/users', users);
    app.use(error);
};