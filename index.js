const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(express.json());

app.use(cors());

app.post("/payment", async (req, res) => {
  let { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      receipt_email: "a.b@gmail.com",
      currency: "USD",
      description: "Garden City",
      payment_method: id,
      confirm: true,
      confirmParams: {},
      return_url: "http://localhost:3000/cart",
    });

    console.log("Payment", payment);
    res.json({
      message: "Payment successful",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
});

app.listen(process.env.PORT || 8081, () => {
  console.log("Sever is listening on port 8081");
});
