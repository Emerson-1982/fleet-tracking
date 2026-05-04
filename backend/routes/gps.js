const express = require("express");
const router = express.Router();
const db = require("../db");

/*
  Guarda o estado atual de cada veículo em memória
  (último status, início da parada)
*/
const vehicleStates = {};

router.post("/location", function (req, res) {
  const vehicleId = req.body.vehicleId;
  const status = req.body.status;
  const timestamp = req.body.timestamp;

  if (!vehicleId || !status || !timestamp) {
    return res.status(400).json({ error: "Dados inválidos" });
  }

  if (!vehicleStates[vehicleId]) {
    vehicleStates[vehicleId] = {
      lastStatus: "MOVIMENTO",
      stopStart: null
    };
  }

  const state = vehicleStates[vehicleId];

  // ✅ Entrou em PARADO
  if (status === "PARADO" && state.lastStatus !== "PARADO") {
    state.stopStart = timestamp;
  }

  // ✅ Saiu de PARADO
  if (status === "MOVIMENTO" && state.lastStatus === "PARADO") {
    const stopStart = state.stopStart;
    const stopEnd = timestamp;

    const durationSeconds = Math.floor(
      (new Date(stopEnd) - new Date(stopStart)) / 1000
    );

    db.query(
      `
      INSERT INTO vehicle_stops
      (vehicle_id, stop_start, stop_end, duration_seconds)
      VALUES ($1, $2, $3, $4)
      `,
      [vehicleId, stopStart, stopEnd, durationSeconds]
    ).catch(err => {
      console.error("Erro ao salvar parada:", err);
    });

    state.stopStart = null;
  }

  state.lastStatus = status;

  res.json({ ok: true });
});

module.exports = router;
