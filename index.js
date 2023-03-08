const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors=require("cors");
const stripe = require('stripe')('sk_test_51McoGoSBTsTb4qbmPPogsJghMKYqj9cgUO24LvRHqioPBeKBEjFVLKomFXSzm77ZbplU58DUoeaZMJmkYG86DnDY00yGVYh28f');

const dotenv = require("dotenv");

dotenv.config();
const userRoutes = require("./routes/userRoutes")
const adminRoutes = require("./routes/adminRoutes")
mongoose.set('strictQuery', true);

try {
  mongoose.connect(process.env.MONGO_URI);  
  console.log("DB Connected");
} catch (err) {
  console.log(err);
}

app.use(cors());
app.use(express.json());

const YOUR_DOMAIN = 'http://localhost:5000'

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: 'price_1Mcx77SBTsTb4qbmfjFfZuNh',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `http://localhost:5000/`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
});

app.use("/api/user", userRoutes);
// app.use("/api/admin", adminRoutes);

app.listen(5000, () => {
  console.log("Backend Server running ");
});
