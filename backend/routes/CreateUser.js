const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = "MyNameIsAlooGhobhiBhindi.$#";
const nodemailer = require("nodemailer");
router.post(
  "/createuser",
  [
    body("email").isEmail(),
    // password must be at least 5 chars long
    body("name").isLength({ min: 2 }),
    body("password", "password must be contain 8 character").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);
    try {
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password", "password must be contain 8 character").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "Try login with correct Email" });
      }
      const pwdCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (!pwdCompare) {
        return res
          .status(400)
          .json({ errors: "Try login with correct Password" });
      }
      const data = {
        user: {
          id: userData.id,
        },
      };
      const authToken = jwt.sign(data, jwtSecret);
      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);
router.post("/forgot-password", async (req, res) => {
  let email = req.body.email;
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.send({ Status: "User not existed" });
    }
    // console.log(token);

    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "1d" });
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "jakob14@ethereal.email",
        pass: "89GuEdTuNMUH1j1haz",
      },
    });
    var mailOptions = {
      from: "jakob14@ethereal.email",
      to: user.email,
      subject: "Reset password link",
      text: `http://localhost:3000/reset-password/${user._id}/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent:" + info.response);
        return res.json({ success: true });
      }
    });
  });
});
router.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err.message);
    } else {
      console.log("Token decoded and verified:", decoded);
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          User.findByIdAndUpdate({ _id: id }, { password: hash })
            .then((u) => res.json({ success: true }))
            .catch((err) => res.json({ success: false }));
        })
        .catch((err) => res.json({ success: false }));
    }
  });
});
module.exports = router;
