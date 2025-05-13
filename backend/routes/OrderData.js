require("dotenv").config();
const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/orderData", async (req, res) => {
  let data = req.body.order_data;
  await data.splice(0, 0, { order_date: req.body.order_date });
  console.log("data" + req.body.email);

  let eId = await Order.findOne({ email: req.body.email });
  if (eId === null) {
    try {
      console.log(data);
      console.log("email", req.body.email);
      await Order.create({
        email: req.body.email,
        order_data: [data],
      }).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.send("server Error", error.message);
    }
  } else {
    try {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      ).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      res.send("server Error", error.message);
    }
  }
});
router.post("/myOrderData", async (req, res) => {
  try {
    let myData = await Order.findOne({ email: req.body.email });
    res.json({ orderData: myData });
  } catch (error) {
    res.send("server Error", error.message);
  }
});
router.post("/create-checkout-session", async (req, res) => {
  const { items } = req.body;

  const lineItems = items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
      },
      unit_amount: Math.round(item.price * 100), // Convert to cents
    },
    quantity: item.qty,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
