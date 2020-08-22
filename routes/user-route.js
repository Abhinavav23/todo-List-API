const express = require("express");
const User = require("../model/user");
const router = new express.Router();

router.post("/register", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = user.generateToken();
    res.status(200).send(user);
  } catch (e) {
    res.status(404).send(`Error: ${e.message}`);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateToken();
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(401).send(e.message);
  }
});

module.exports = router;
