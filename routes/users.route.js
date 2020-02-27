const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const nodemailer = require("../config/nodemailer");
const userModel = require("../models/user.model");
const collectionModel = require("../models/collection.model");

router.get("/", async function(req, res, next) {
  try {
    const users = await userModel.find();
    res.status(200).json({
      message: "List of all users",
      data: users
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
});

router.post("/", async function(req, res, next) {
  try {
    const { firstname, lastname, email, password, role, status } = req.body;
    const newUser = new userModel({
      firstname,
      lastname,
      email,
      password,
      role,
      status
    });
    newUser.setPassword(password);
    await newUser.save(req.body);
    res.status(200).json({
      message: "New user created",
      data: newUser
    });
  } catch (error) {
    res.status(500).json({
      data: error
    });
  }
});

router.post("/request-access", async function(req, res, next) {
  try {
    const { firstname, lastname, email } = req.body;
    let info = await nodemailer.sendMail({
      from: `DAM - Orangina Suntory France <louise.brebion@suntory.com>`, // sender address
      to: "abrebion@gmail.com", // list of receivers
      subject: `${firstname} ${lastname} is requesting access`, // Subject line
      html: `
      <strong>${firstname} ${lastname}</strong> (${email}) is requesting access to the DAM.<br>
      Directly give her/him access, by clicking this <a href="">link</a>.<br>
      He/she will receive an email with a link to set a password and finalize acount setup.
      ` // html body
    });
    console.log("Message sent: %s", info.messageId);
    res.status(200).json({
      status: "success",
      message: "Request access has been sent"
    });
  } catch (error) {
    res.status(500).json({
      data: error
    });
  }
});

router.get("/:id", async function(req, res, next) {
  try {
    const user = await userModel.findById(req.params.id);
    res.status(200).json({
      message: "Read user",
      data: user
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
});

router.get("/:id/collections", async function(req, res, next) {
  try {
    const collections = await collectionModel.find({ user: req.params.id });
    res.status(200).json({
      message: "Read user collections",
      data: collections
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
});

router.delete("/:id", async function(req, res, next) {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    const collections = await collectionModel.deleteMany({ user: req.params.id });
    res.status(200).json({
      message: "User and his collections were deleted",
      user: user,
      collections: collections
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
});

router.patch("/update-password", async function(req, res, next) {
  try {
    const { email, currentPassword, newPassword, newPasswordConfirmation } = req.body;
    if (newPassword !== newPasswordConfirmation) return res.json({ status: "error", message: "New password doesn't match!" });
    const user = await userModel.findOne({ email });
    if (!user) return res.json({ status: "error", message: "We couldn't find a user with this email." });
    if (!bcryptjs.compareSync(currentPassword, user.password)) {
      return res.json({ status: "error", message: "Current password is not valid for this email." });
    }
    const hashedPassword = bcryptjs.hashSync(newPassword, 10);
    const updateUser = await userModel.findByIdAndUpdate(user._id, { password: hashedPassword }, { new: true });
    return res.json({ status: "success", message: "Current password is correct" });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
});

router.patch("/:id", async function(req, res, next) {
  try {
    const user = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({
      message: "User updated",
      user: user
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
});

module.exports = router;
