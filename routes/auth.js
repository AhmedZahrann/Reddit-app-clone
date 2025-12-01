import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();
 
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      passwordHash: hashedPassword,
    });

    await user.save();
    res.json({ message: "User created successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // find the user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    // check password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ error: "Wrong password" });

    // create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
