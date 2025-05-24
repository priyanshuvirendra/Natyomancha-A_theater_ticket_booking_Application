import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import {
  comparePassword,
  generateToken,
  hashPassword,
} from "../utils/authUtils.js";
import { instance } from "../config/paymentGatewayConfig.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

// configuration

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.TEAM_EMAIL_ADDRESS,
    pass: process.env.TEAM_EMAIL_PASSWORD,
  },
});

// **************************** PUBLIC CONTROLLERS *******************************

// Register a user

export const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    confirmPassword,
    image,
    isAdmin,
    isSubscriber,
  } = req.body;

  // check if passwords match
  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("Passwords do not match");
  }

  const userExists = await User.findOne({ email });

  // check if the email is already registered
  if (userExists) {
    res.status(400);
    throw new Error("Email already registered");
  }

  // hash the password
  const hash = await hashPassword(password);

  // create user in DB
  const user = new User({
    name,
    email,
    password: hash, // hash of password
    image,
    isAdmin,
    isSubscriber,
  });

  await user.save();

  // if user is created successfully send user data and token to the client
  if (user) {
    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      image: user.image,
      isAdmin: user.isAdmin,
      isSubscriber: user.isSubscriber,
      favoriteMovies: user.favoriteMovies,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    // If an error occurs, let's pass it to the next middleware (error handling middleware)
    throw new Error("Invalid user data");
  }
});

// Login a user

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password, isLoggingAsAdmin } = req.body;
  // Find the user in DB
  const user = await User.findOne({ email });

  // If the user is not found in the DB, throw error
  if (!user) {
    res.status(400);
    throw new Error("User does not exist");
  }

  // check if the user is logging in for the correct role
  const validRole = isLoggingAsAdmin === user.isAdmin;
  if (!validRole) {
    res.status(400);
    throw new Error("Invalid login role");
  }

  // compare password entered with the actual hashed password
  const validPassword = await comparePassword(password, user.password);

  // If user exists, and given password is valid, then send user data and token to client
  if (user && validPassword) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      isAdmin: user.isAdmin,
      isSubscriber: user.isSubscriber,
      subscriptionId: user.subscriptionId,
      favoriteMovies: user.favoriteMovies,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid password");
  }
});

export const requestPasswordReset = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send("User not found");
  }

  const code = crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit code
  user.resetPasswordCode = code;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  const mailOptions = {
    to: user.email,
    from: process.env.TEAM_EMAIL_ADDRESS,
    subject: "Natyomancha: Password Reset Verification Code",
    text: `Your password reset verification code is ${code}. It is valid for 1 hour.`,
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      throw new Error("Error sending email");
    }
    res.send("Verification code sent");
  });
});

export const verifyCode = async (req, res) => {
  const { email, code } = req.body;
  const user = await User.findOne({
    email,
    resetPasswordCode: code,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) {
    return res.status(400).send("Verification code is invalid or has expired.");
  }
  res.send("Code is valid");
};

export const resetPassword = async (req, res) => {
  const { email, code, password } = req.body;
  const user = await User.findOne({
    email,
    resetPasswordCode: code,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) {
    return res.status(400).send("Verification code is invalid or has expired.");
  }

  user.password = await hashPassword(password);
  user.resetPasswordCode = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.send("Password has been reset");
};

// **************************** PRIVATE CONTROLLERS *******************************

// Get the details of logged in user

export const getLoggedInUserDetails = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// Update user profile

export const updatedUserProfile = asyncHandler(async (req, res) => {
  const { name, email, image, isSubscriber, subscriptionId } = req.body;
  const user = await User.findById(req.user._id);
  // if user exists update user data and save it in DB
  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    user.image = image || user.image;
    if (isSubscriber === false) {
      user.isSubscriber = false;
      user.subscriptionId = "";
    } else {
      user.isSubscriber = isSubscriber || user.isSubscriber;
      user.subscriptionId = subscriptionId || user.subscriptionId;
    }

    const updatedUser = await user.save();
    // send updated user data and token to the client
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      image: updatedUser.image,
      isAdmin: updatedUser.isAdmin,
      isSubscriber: updatedUser.isSubscriber,
      subscriptionId: updatedUser.subscriptionId,
      favoriteMovies: updatedUser.favoriteMovies,
      token: generateToken(updatedUser._id),
    });
  }
  // if user does not exist, send error message
  else {
    res.status(404);
    throw new Error("User does not exist");
  }
});

// Delete user profile

export const deleteUserProfile = asyncHandler(async (req, res) => {
  // Find the user by its ID
  const user = await User.findById(req.user._id);

  // If user exists, proceed with deletion
  if (user) {
    // Check if the user is an admin. Admin users can't be deleted.
    if (user.isAdmin) {
      res.status(403); // Change status code to 403 Forbidden
      throw new Error("Can't delete admin user");
    }

    // If the user is not an admin, proceed with deletion
    await User.deleteOne({ _id: req.user._id }); // Use deleteOne() method
    res.json({ message: "User deleted successfully" });
  } else {
    // If user doesn't exist, return a 404 error
    res.status(404);
    throw new Error("User does not exist");
  }
});

// Change user password

export const changeUserPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  // find user in DB
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // compare old password entered with the old existing hashed password
  const validPassword = await comparePassword(oldPassword, user.password);

  // if user exists compare old password with hashed password, then update user password and save it in the DB
  if (user && validPassword) {
    // Update user's password and save it in the database
    user.password = await hashPassword(newPassword); // hash new password
    await user.save(); // Save user in the DB

    res.json({ message: "Password changed successfully" });
  } else {
    // If old password is incorrect or user doesn't exist, send error message
    res.status(401);
    throw new Error("Invalid old password");
  }
});

export const getAllUsers = asyncHandler(async (req, res) => {
  // find all users in DB
  const users = await User.find({});
  res.json(users);
});

// Delete a user

export const deleteUser = asyncHandler(async (req, res) => {
  // find user in DB
  const user = await User.findById(req.params.id);
  // if user exists delete user from DB
  if (user) {
    // if user is admin throw error message
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Can't delete admin user");
    }
    // else delete user from DB
    await User.deleteOne(user); // Use deleteOne() method instead of user.remove() method
    res.json({ message: "User deleted successfully" });
  }
  // else send error message
  else {
    res.status(404);
    throw new Error("User not found");
  }
});
