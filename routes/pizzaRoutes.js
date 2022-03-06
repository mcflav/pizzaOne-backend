const express = require('express');
const {Pizza, validate} = require('../models/pizzaModel');
const router = express.Router();

router.get('/', async (req,res) => {
   const pizzas = await Pizza.find().sort('name');
   res.send(pizzas);
});

router.get('/:id', async (req,res) => {
    const pizza = await Pizza.findById(req.params.id);
    if (!pizza) return res.status(404).send("This pizza could not be found.");
    res.send(pizza);
});

router.post('/', async (req,res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let pizza = new Pizza({name: req.body.name, size: req.body.size, price: req.body.price});
    pizza = await pizza.save();
    res.send(pizza);
});

router.put('/:id', async (req,res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const pizza = await Pizza.findByIdAndUpdate(req.params.id, req.body);
    if (!pizza) return res.status(404).send("This pizza could not be found.");
    res.send(pizza);
});

router.delete('/:id', async (req,res) => {
    const pizza = await Pizza.findByIdAndRemove(req.params.id);
    if (!pizza) return res.status(404).send("This pizza could not be found.");
    res.send(pizza);
});

module.exports = router;