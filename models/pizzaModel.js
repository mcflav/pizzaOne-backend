const mongoose = require('mongoose');
const Joi = require('joi');

const pizzaSchema = new mongoose.Schema({
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
      minlength: 18,
      maxlength: 255
  },
  veggies: {
      type: String,
      minlength: 18,
      maxlength: 255
  },
  wings: {
      type: String,
      minlength: 18,
      maxlength: 255
  },
  breadsticks: {
      type: String,
      minlength: 18,
      maxlength: 255
  },
  drinks: {
      type: String,
      minlength: 4,
      maxlength: 60
  }
});

const Pizza = mongoose.model('Pizza', pizzaSchema);

function validatePizza(pizzas) {
    const schema = {
      size: Joi.string().min(5).max(6).required(),
      crust: Joi.string().min(4).max(11).required(),
      cheese: Joi.string().min(5).max(7).required(),
      meats: Joi.string().min(18).max(255),
      veggies: Joi.string().min(18).max(255),
      wings: Joi.string().min(18).max(255),
      breadsticks: Joi.string().min(18).max(255),
      drinks: Joi.string().min(4).max(60)
    };
        return Joi.validate(pizzas, schema);
}

exports.validate = validatePizza;
exports.Pizza = Pizza;