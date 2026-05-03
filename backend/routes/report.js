const express = require("express");
const router = express.Router();
const db = require("../db");

// Retorna histórico de um veículo
router.get("/history/:vehicleId", async (req, res) => {
  const { vehicleId } = req.params;

  try {
    const result = await db.query(
      `SELECT latitude, longitude, created_at
       FROM gps_positions
       WHERE vehicle_id = $1
       ORDER BY created_at`,
      [vehicleId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar histórico:", error);
    res.status(500).json({ error: "Erro ao buscar histórico" });
  }
});

module.exports = router;
