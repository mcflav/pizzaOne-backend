const express = require('express');
const bcrypt = require('bcrypt');
const {User, validateUsers} = require('../models/orderModel');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');

router.get('/', async (req,res) => {
    const users = await User.find().sort('lastname');
    res.send(users);
});

router.get('/:id', validateObjectId, async (req,res) => {
    const user = await User.findById(req.params.id);
    res.send(user);
});

router.post('/', async (req,res) => {
    const {error} = validateUsers(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let user = new User({email: req.body.email, firstname: req.body.firstname, lastname: req.body.lastname, password: req.body.password, isAdmin: req.body.isAdmin});
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user = await user.save();
    res.send(user);    
});

router.put('/:id', [admin, validateObjectId], async (req,res) => {
    const {error} = validateUsers(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.send(user);
});

router.delete('/:id', [admin, validateObjectId], async (req,res) => {
    const user = await User.findByIdAndRemove(req.params.id);
    res.send(user);
});

module.exports = router;