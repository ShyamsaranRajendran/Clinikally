const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user.js");
const mailer = require("../utils/mailer.js");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const authenticate = require("../utils/ForgetAuth.js");
const path = require('path')
const dotenv = require('dotenv');
dotenv.config();
router.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 3600000,
    },
  })
);

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}
const JWT_SECRET  = process.env.JWT_SECRET;

router.post("/register", async function (req, res) {
  try {
    console.log("Reached");
    const { name, email, username, password, phoneNumber } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      console.log("Error user");
      return res.status(400).json({ error: "Username already exists, choose another" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
      phoneNumber,
      admin: 0,
    });

    // Save the new user in the database
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send a registration confirmation email
    await mailer(
      email,
      "Registration",
      "Welcome to Clinikally and happy purchasing. Please confirm your registration."
    );

    res.json({ success: "You will receive an email notification.", token: token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



router.post("/login", async function (req, res) {
  const { email, password } = req.body;
  console.log("Login attempt:", email, password);

  try {
    // Check if the user exists by email
    const user = await User.findOne({ email });
    console.log("User lookup result:", user);
    if (!user) {
      return res.status(400).json({ error: "Invalid identifier or password" });
    }
  console.log("User found:", user);
    // Verify the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid identifier or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Optionally, you can set a session token if using session middleware
    req.session.token = token;

    // Respond with success, user details, and token
    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
      token: token,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/logout", async function (req, res) {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "You are not logged in" });
    }

    jwt.verify(token, JWT_SECRET, function (err, decoded) {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      }

      req.session.destroy(function (err) {
        if (err) {
          console.error("Error destroying session:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        res.json({ message: "You are logged out!" });
      });
    });
  } catch (error) {
    console.error("Error logging out user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get-user", (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, JWT_SECRET, function (err, decoded) {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    User.findById(decoded.userId, function (err, user) {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json({ user });
    });
  });
});

// Route to initiate password reset
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const OTP = generateOTP();
    await mailer(
      email,
      "Password Reset OTP",
      `Your OTP for password reset is: ${OTP}`,
      `Your OTP for password reset is: <b>${OTP}</b>`
    );

    const token = jwt.sign({ email, OTP }, JWT_SECRET, { expiresIn: "15m" });
    res.json({ token });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Error sending email" });
  }
});

router.post("/verify-otp", authenticate, async (req, res) => {
  try {
    const { OTP } = req.body;

    if (req.OTP !== parseInt(OTP)) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    const user = await User.findOne({ email: req.email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "OTP verified. You can now reset your password." });
  } catch (error) {
    console.error(error);
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return res.status(401).json({ error: "Invalid or expired token" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

// Route to reset password
router.post("/reset-password", authenticate, async (req, res) => {
  try {
    const { newPassword } = req.body;
    const user = await User.findOne({ email: req.email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);
    user.password = hash;
    await user.save();
    res.json({ message: "Password reset successfully. Please log in again." });
  } catch (error) {
    console.error(error);
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return res.status(401).json({ error: "Invalid or expired token" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

router.post("/verify-token", (req, res) => {
  const token = req.headers.authorization.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    res.json({ message: "Token is valid" });
  });
});


module.exports = router;



