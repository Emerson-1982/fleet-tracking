const express = require("express");
const router = express.Router();
const db = require("../db");

// Recebe localização do veículo
router.post("/location", function (req, res) {
  const vehicleId = req.body.vehicleId;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const timestamp = req.body.timestamp;

  db.query(
    `INSERT INTO gps_positions
     (vehicle_id, latitude, longitude, created_at)
     VALUES ($1, $2, $3, $4)`,
    [vehicleId, latitude, longitude, timestamp]
  )
    .then(function () {
      res.json({ status: "OK" });
    })
    .catch(function (error) {
      console.error("Erro ao salvar GPS:", error);
      res.status(500).json({ error: "Erro ao salvar posição" });
    });
});

module.exports = router;
