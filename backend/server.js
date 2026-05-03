const express = require("express");
const path = require("path");

const app = express();

// Enable JSON body parsing
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Root route
app.get("/", function (req, res) {
  res.send("Fleet Tracking Server is running ✅");
});

app.listen(3000, function () {
  console.log("Server running on port 3000");
});
