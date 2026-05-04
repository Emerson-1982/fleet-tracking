const express = require("express");
const router = express.Router();
const db = require("../db");

/*
  Relatório diário de tempo parado por veículo
*/
router.get("/daily/:vehicleId", function (req, res) {
  const vehicleId = req.params.vehicleId;

  db.query(
    `
    SELECT
      DATE(stop_start) AS dia,
      SUM(duration_seconds) AS total_parado_segundos
    FROM vehicle_stops
    WHERE vehicle_id = $1
    GROUP BY dia
    ORDER BY dia DESC
    `,
    [vehicleId]
  )
    .then(result => res.json(result.rows))
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
