const express = require("express");
const path = require("path");

// Importa as rotas de GPS
const gpsRoutes = require("./routes/gps");

const app = express();

// Permite receber JSON no body (POST)
app.use(express.json());

// Serve arquivos HTML (vehicle.html, map.html, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Rotas da API (/api/location e /api/vehicles)
app.use("/api", gpsRoutes);

// Rota principal
app.get("/", function (req, res) {
  res.send("Fleet Tracking Server is running ✅");
});

// Inicia o servidor
app.listen(3000, function () {
  console.log("Server running on port 3000");
});
