const jwt = require("jsonwebtoken");
const User = require("../model/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const valid = jwt.verify(token, "ApiSecretKey001");
    const user = await User.findOne({ _id: valid._id });
    if (!user) {
      throw new Error("please authenticate");
    }
    req.user = user;
    req.token = token;
  } catch (e) {
    res.status(404).send(e.message);
  }
  next();
};

module.exports = auth;
