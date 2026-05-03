const express = require("express");
const path = require("path");

const app = express();

// Serve static files from public folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Fleet Tracking Server is running ✅");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
