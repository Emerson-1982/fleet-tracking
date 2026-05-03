const express = require("express");
const router = express.Router();

// Última posição
const vehicles = {};

// Histórico de posições (trajeto)
const tracks = {};

router.post("/location", function (req, res) {
  const vehicleId = req.body.vehicleId;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const timestamp = req.body.timestamp;

  if (!vehicleId || latitude === undefined || longitude === undefined) {
    return res.status(400).json({ error: "Dados inválidos" });
  }

  // Última posição
  vehicles[vehicleId] = {
    latitude: latitude,
    longitude: longitude,
    timestamp: timestamp
  };

  // Histórico (trajeto)
  if (!tracks[vehicleId]) {
    tracks[vehicleId] = [];
  }

  tracks[vehicleId].push([latitude, longitude]);

  res.json({ status: "OK" });
});

// Retorna veículos (ponto)
router.get("/vehicles", function (req, res) {
  res.json(vehicles);
});

// ✅ NOVA ROTA — Retorna trajeto
router.get("/track/:vehicleId", function (req, res) {
  const vehicleId = req.params.vehicleId;
  res.json(tracks[vehicleId] || []);
});

module.exports = router;
