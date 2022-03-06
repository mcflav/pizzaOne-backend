const express = require('express');
const mongoose = require('mongoose');
const { Order, User, validateOrders } = require('../models/orderModel');
const { Pizza } = require('../models/pizzaModel');
const validateObjectId = require('../middleware/validateObjectId');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, async (req,res) => {
   const orders = await Order.find().sort('lastname');
   res.send(orders);
});

router.post('/getOrder', auth, async (req,res) => {
    
    const user = await User.find();
    const userOrder = req.body.user;

    let orderFound = false;
        
    for (i = 0; i < user.length; i++) {
       if (user[i]._id == userOrder) {
           orderFound = true;
       }
    }
    
    if (orderFound === false) {
        return res.status(404).send('An order could not be found for this user');
    } else {
      const orders = await Order.find({user: userOrder});
      res.send(orders);
    }
});

router.get('/:id', auth, validateObjectId, async (req,res) => {
    const order = await Order.findById(req.params.id);
    res.send(order);
});

router.post('/', auth, async (req,res) => {
    const {error} = validateOrders(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    async function createOrder(size, crust, cheese, meats, veggies, wings, breadsticks, drinks, total, user) {
        const order = new Order({size, crust, cheese, meats, veggies, wings, breadsticks, drinks, total, user});
        const results = await order.save();
        res.send(results);
    }
    
    createOrder(req.body.size, req.body.crust, req.body.cheese, req.body.meats, req.body.veggies, req.body.wings,
        req.body.breadsticks, req.body.drinks, req.body.total, req.body.user);
});

router.put('/:id', [auth, admin, validateObjectId], async (req,res) => {
    const {error} = validateOrders(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const order = await Order.findByIdAndUpdate(req.params.id, req.body);
    if (!order) return res.status(404).send("Invalid ID.");

    res.send(order);
});

router.delete('/:id', [auth,admin, validateObjectId], async (req,res) => {
    const order = await Order.findByIdAndRemove(req.params.id);
    if (!order) return res.status(404).send("Invalid ID.");
    res.send(order);
});

module.exports = router;