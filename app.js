const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

// Middlewares
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(express.static("public"));

// For Email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
  user: process.env.HOST_EMAIL,
  pass: process.env.HOST_PASS,
},
});

app.post("/newPayment", (req, res) => {
const { name, phone, email, amt } = req.body;

  let mailBody = `Hi ${name},\n\nThanks for donating ${amt} to us. We'll contact you shortly at ${phone}\n\nRegards,\nAastha Sehgal`;

  var mailOptions = {
    from: process.env.HOST_EMAIL,
    to: email,
    subject: "Thanks for Donating!",
    text: mailBody,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "An error occured" });
    } else {
      console.log("Email Sent: ", info.response);
      res.status(200).json({ message: "Successfully Sent Email!" });
    }
  });
});

app.get("*", (req, res) => {
  res.send("<h1>404! Page Not Found</h1>");
});

PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
