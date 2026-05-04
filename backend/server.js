const express = require("express");
const path = require("path");

// Importa as rotas
const gpsRoutes = require("./routes/gps");
const relatorioRoutes = require("./routes/relatorio");

const app = express();

// Permite receber JSON no body (POST)
app.use(express.json());

// Serve arquivos HTML (dashboard, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Rotas da API
app.use("/api", gpsRoutes);
app.use("/report", relatorioRoutes);

// Rota principal
app.get("/", function (req, res) {
  res.send("Fleet Tracking Server is running ✅");
});

// Inicia o servidor
app.listen(3000, function () {
  console.log("Server running on port 3000");
});`
