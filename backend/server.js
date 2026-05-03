// Store last position of each vehicle (in memory)
const vehicles = {};
const express = require("express");
const path = require("path");

const app = express();

// Serve static files from public folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Fleet Tracking Server is running ✅");
});

// Receive GPS data from vehicles
app.post("/api/location", (req, res) => {
  const { vehicleId, latitude, longitude, timestamp } = req.body;

  console.log("GPS received:");
  console.log("Vehicle:", vehicleId);
  console.log("Latitude:", latitude);
  console.log("Longitude:", longitude);
  console.log("Time:", timestamp);

  res.json({ status: "OK" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
