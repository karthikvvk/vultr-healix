const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  const { username, email, password, phone } = req.body;
  console.log("Register Data:", req.body);

  try {
    const existingUser  = await User.findOne({ email });
    if (existingUser ) {
      return res.status(400).json({ message: "User  already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser  = new User({
      username,
      email,
      password: hashedPassword,
      phone
    });

    await newUser .save();

    const token = jwt.sign({ userId: newUser ._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.status(201).json({ token, message: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  console.log(email, password);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User  not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).json({ token, message: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};