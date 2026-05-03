const express = require("express");
const router = express.Router();

// Guardar posição dos veículos em memória
const vehicles = {};

// Recebe localização do veículo
router.post("/location", function (req, res) {
  const vehicleId = req.body.vehicleId;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const timestamp = req.body.timestamp;

  if (!vehicleId || latitude === undefined || longitude === undefined) {
    return res.status(400).json({ error: "Dados inválidos" });
  }

  vehicles[vehicleId] = {
    latitude: latitude,
    longitude: longitude,
    timestamp: timestamp
  };

  console.log("GPS recebido:", vehicleId, latitude, longitude);

  res.json({ status: "OK" });
});

// ✅ ESTA É A ROTA QUE ESTAVA FALTANDO
router.get("/vehicles", function (req, res) {
  res.json(vehicles);
});

module.exports = router;
