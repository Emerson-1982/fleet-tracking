const express = require("express");
const path = require("path");

const gpsRoutes = require("./routes/gps");

const app = express();

// Permite ler JSON enviado pelo veículo
app.use(express.json());

// Conecta as rotas de GPS
app.use("/api", gpsRoutes);

// Serve arquivos HTML
app.use(express.static(path.join(__dirname, "public")));

// Rota principal
app.get("/", function (req, res) {
  res.send("Fleet Tracking Server is running ✅");
});

// Inicia o servidor
app.listen(3000, function () {
  console.log("Server running on port 3000");
});
