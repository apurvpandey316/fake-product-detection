const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  company: {
    type: String,
  },
  price: {
    type: Number,
  },
  manufacteurId: {
    type: String,
  },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
