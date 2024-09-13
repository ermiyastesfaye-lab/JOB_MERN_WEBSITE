const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "ermiyas tesfaye secret", {
    expiresIn: maxAge,
  });
};
const signUp = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.cookie("user_id", user._id, {
      maxAge: maxAge * 1000,
    });
    return res.status(200).json(user);
  } catch (err) {
    if (err.code === 11000) {
      res
        .status(500)
        .json({ message: err.message, duplicate: "Duplicate entry" });
    }
    res.status(500).json({ message: err.message });
  }
};
const logIn = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName: userName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.cookie("user_id", user._id, {
        maxAge: maxAge * 1000,
      });
      return res.status(200).json(user);
    } else {
      return res.status(401).json({ message: "the password is incorrect" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
};

const logOut = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.cookie("user_id", "", { maxAge: 1 });
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { signUp, logIn, logOut };
