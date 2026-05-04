CREATE TABLE vehicle_stops (
  id SERIAL PRIMARY KEY,
  vehicle_id VARCHAR(50) NOT NULL,
  stop_start TIMESTAMP NOT NULL,
  stop_end TIMESTAMP NOT NULL,
  duration_seconds INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
