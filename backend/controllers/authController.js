const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const { sendOtp } = require("./otpController");
const { verifyOtp } = require("./otpController");

async function registerController(req, res) {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if (!hashPassword) {
      return res.status(400).json({ message: "Something went wrong." });
    }

    const userData = new User({ username, email, password: hashPassword });
    const savedUser = await userData.save();

    await sendOtp(email); // Send OTP

    res.status(201).json({
      data: savedUser,
      message: "User created successfully! Check your email for the OTP.",
    });
  } catch (error) {
    res.json({
      message: error.message || error,
    });
  }
}

async function loginController(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    // generates JWT token
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    // Exclude password from the user object
    const { password: _, ...userData } = user.toObject();

    res.json({ message: "Login successful!", token, user: userData });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const verifyOtpController = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const isValid = await verifyOtp(email, otp); // Assuming verifyOtp is asynchronous

    if (isValid) {
      return res.status(200).json({ message: "OTP verified successfully!" });
    } else {
      return res.status(400).json({ message: "Invalid OTP." });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while verifying OTP." });
  }
};

module.exports = { registerController, loginController, verifyOtpController };
