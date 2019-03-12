const express = require("express");
const router = express.Router();
const https = require("https");

const keys = require("../../config/keys");

const Email = require("../../models/Email");

router.get("/", (req, res) => {
  var dict;
  https
    .get(
      "https://api.nasa.gov/planetary/apod?api_key=" +
        keys.nasa_api_key +
        "&hd=True",
      response => {
        response.on("data", d => {
          dict = JSON.parse(d.toString("utf8"));
          return res.status(200).json(dict);
        });
      }
    )
    .on("error", err => {
      console.log(err);
    });
});

router.post("/save", (req, res) => {
  Email.findOne({ email: req.body.email }).then(email => {
    if (email) {
      const errors = "Email already exists.";
      return res.status(200).json(errors);
    } else {
      Email({
        email: req.body.email
      })
        .save()
        .then(() => res.status(200).json("Successfully Added"))
        .catch(err => console.log(err));
    }
  });
});

module.exports = router;
