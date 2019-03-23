const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
require("dotenv").config();

const db = require("./config/keys");

const landing = require("./routes/api/landing");

// Connect to MongoDB.
mongoose
  .connect(db.mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use(bodyParser.json());

// Home page.
app.use("/api/", landing);

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "frontend/build")));
// Anything that doesn't match the above, send back index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
