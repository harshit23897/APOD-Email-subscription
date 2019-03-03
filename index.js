const express = require("express");
const mongoose = require("mongoose");
const app = express();

const db = require("./config/keys");

const landing = require("./routes/api/landing");

// Connect to MongoDB.
mongoose
  .connect(db.mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Home page.
app.use("/api/", landing);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
