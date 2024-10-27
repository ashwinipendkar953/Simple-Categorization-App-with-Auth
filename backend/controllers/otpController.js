const nodemailer = require("nodemailer");
const User = require("../models/userModel");
const crypto = require("crypto");

let otpStore = {}; // Temporary storage for OTPs

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", // Change this based on your email provider
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your app password
  },
});

// Function to send OTP
async function sendOtp(email) {
  const otp = crypto.randomInt(10000000, 99999999).toString(); // Generate 8-digit OTP
  otpStore[email] = otp; // Store OTP temporarily

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
}

// Function to verify OTP
function verifyOtp(email, otp) {
  const isValid = otpStore[email] && otpStore[email] === otp;
  if (isValid) {
    delete otpStore[email]; // Clear OTP after verification
    return true;
  }
  return false;
}

module.exports = { sendOtp, verifyOtp };
