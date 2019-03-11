const express = require("express");
const router = express.Router();
const https = require("https");

const keys = require("../../config/keys");

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
  console.log(req.body);
});

module.exports = router;
