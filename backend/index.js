const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookie = require("cookie-parser");

// import route
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookie());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/job", jobRoutes);

const PORT = process.env.PORT || 5000;

// create Route here
app.listen(PORT, () => {
  console.log(`App Running at : ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});
