const express = require("express");
const path = require("path");

const gpsRoutes = require("./routes/gps");
const relatorioRoutes = require("./routes/relatorio");

const app = express();

// Enable JSON body parsing
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api", gpsRoutes);
app.use("/api", relatorioRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Fleet Tracking Server is running ✅");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
