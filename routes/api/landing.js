const crypto = require("crypto");
const express = require("express");
const router = express.Router();
const https = require("https");
const fetch = require("node-fetch");
const nodemailer = require("nodemailer");
const schedule = require("node-schedule");

const keys = require("../../config/keys");

const Email = require("../../models/Email");

router.get("/", (req, res) => {
  // Email.collection.remove({});
  var dict;
  https
    .get(
      "https://api.nasa.gov/planetary/apod?api_key=" +
        keys.nasa_api_key +
        "&hd=True",
      response => {
        response.on("data", d => {
          dict = JSON.parse(d.toString("utf8"));
          return res
            .status(200)
            .json([dict, req.protocol + "://" + req.get("host")]);
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

router.get("/unsubscribe/:email/:hash", (req, res) => {
  var shasum = crypto.createHash("sha1");
  var emailHash = shasum.update(req.params.email).digest("hex");

  if (emailHash === req.params.hash) {
    Email.findOneAndRemove({ email: req.params.email }).then(response => {
      if (response !== null) {
        res.status(200).json("Successfully Unsubscribed.");
      } else {
        res.status(200).json("Email Not Found.");
      }
    });
  } else {
    res.status(200).json("Incorrect email or Hash.");
  }
});

var rule = new schedule.RecurrenceRule();
rule.hour = 15;
rule.minute = 15;
rule.second = 30;

callAPI = async () => {
  const res = await fetch("http://localhost:8000/api/");
  const body = await res.json();

  if (res.status !== 200) throw Error(body.message);

  return body;
};

var j = schedule.scheduleJob(rule, async function() {
  callAPI()
    .then(res => {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USERNAME, // generated ethereal user
          pass: process.env.EMAIL_PASSWORD // generated ethereal password
        }
      });

      var mails = [];
      var currentDate = new Date()
        .toISOString()
        .split("T")[0]
        .split("-")
        .reverse()
        .join("-");

      Email.find()
        .then(async emails => {
          for (var index in emails) {
            mails.push(emails[index].email);
          }

          for (mail in mails) {
            var shasum = crypto.createHash("sha1");
            var emailHash = shasum.update(mails[mail]).digest("hex");
            // setup email data with unicode symbols
            let mailOptions = {
              from: '"Harshit Jain" <nasaapodsubscription@gmail.com>', // sender address
              to: mails[mail], // list of receivers
              subject:
                "[" +
                currentDate +
                "] NASA Astronomy Picture Of the Day (APoD)", // Subject line
              html:
                "<p>Hi, </p>" +
                "<p>The NASA APoD is attached below.</p>" +
                "<p><b>Explanation: </b>" +
                res[0].explanation +
                "</p>" +
                "<p>Cheers,</p><p>Harshit Jain.</p><br><a href=" +
                res[1] +
                "/unsubscribe/" +
                mails[mail] +
                "/" +
                emailHash +
                '"' +
                ">unsubscribe</a>",
              attachments: [
                {
                  filename: currentDate + "_NASA_APoD.jpeg",
                  path: res[0].url
                }
              ]
            };

            await transporter.sendMail(mailOptions);
          }
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

module.exports = router;
