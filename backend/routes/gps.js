const express = require("express");
const router = express.Router();
const db = require("../db");

// Recebe localização do veículo
router.post("/location", async (req, res) => {
  const { vehicleId, latitude, longitude, timestamp } = req.body;

  try {
    await db.query(
      `INSERT INTO gps_positions
       (vehicle_id, latitude, longitude, created_at)
       VALUES ($1, $2, $3, $4)`,
      [vehicleId, latitude, longitude, timestamp]
    );

    res.json({ status: "OK" });
  } catch (error) {
    console.error("Erro ao salvar GPS:", error);
    res.status(500).json({ error: "Erro ao salvar posição" });
  }
});

module.exports = router;
