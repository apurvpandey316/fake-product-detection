require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("./models/UserModel");
const Product = require("./models/ProductModel");
const jwt = require("jsonwebtoken");
const sha256 = require("sha256");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 5000;
mongoose
  .connect("mongodb://localhost:27017/test")
  .then((res) => console.log("connected to localhost database"));
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("*", (req, res, next) => {
  //here check for the jwt in the cookie
  next();
});
const maxAge = 60 * 60 * 24 * 3;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: maxAge,
  });
};
app.get("/getUser", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const data = jwt.verify(token, process.env.SECRET);
    let user = data.id;
    user = await User.findById(user);
    res.json({ user });
  } catch (error) {
    res.status(404).json({ success: false });
  }
});
app.post("/login", async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({ success: false, message: "user not found" });
      return;
    }
    if (role != user.role) {
      res.status(404).json({ success: false, message: "user not found" });
      return;
    }
    if (!(await bcrypt.compare(String(password), user.password))) {
      res.status(400).json({ success: false, error: "password is wrong" });
      return;
    }
    const token = createToken(user._id);
    res.cookie("jwt", token, { maxAge: maxAge * 1000 });
    res.status(200).json({ success: true, user, token });
  } catch (error) {
    res.json({ success: false, error }).status(404);
  }
});
app.post("/signUp", async (req, res) => {
  try {
    const { username, password, email, role } = req.body;
    let user = new User({
      username: username,
      password: password,
      email: email,
      role: role,
    });
    user = await user.save();
    const hash = sha256(JSON.stringify(user) + Date.now());
    console.log(hash);
    const token = createToken(user._id);
    res.cookie("jwt", token, { maxAge: maxAge * 1000 });
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(501).send(error.message);
  }
});
app.get("/logout", async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 }).status(200).send("Logged Out");
});
app.get("/getAll", async (req, res) => {
  const users = await User.find();
  res.send(users);
});
app.get("/getAllProducts", async (req, res) => {
  const users = await Product.find();
  res.send(users);
});
app.get("/deleteAll", async (req, res) => {
  try {
    const delCount = await User.deleteMany();
    res.status(200).json({ delCount });
  } catch (error) {
    console.log(error);
  }
});
app.get("/deleteAllProducts", async (req, res) => {
  try {
    const delCount = await Product.deleteMany();
    res.status(200).json({ delCount });
  } catch (error) {
    console.log(error);
  }
});
app.post("/getProduct", async (req, res) => {
  try {
    const { id } = req.body;
    console.log(req.body);
    const product = await Product.findById(id);
    console.log(product);
    res.status(200).send(product);
  } catch (error) {
    console.log(error);
  }
});
app.post("/addProduct", async (req, res) => {
  try {
    const { name, company, price, manufacteurId } = req.body;
    let newProduct = new Product({
      name: name,
      company: company,
      price: price,
      manufacteurId: manufacteurId,
    });
    newProduct = await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(501).json(error);
  }
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
