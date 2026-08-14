import "dotenv/config";
import express from "express";
import cors from "cors";

import driver from "./config/db.js";
import careerRoutes from "./routes/careerRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", async (req, res) => {
  try {
    await driver.verifyConnectivity();

    res.json({
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    res.status(503).json({
      status: "error",
      database: "unavailable",
    });
  }
});

app.use("/api", careerRoutes);

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    error: "Something went wrong while processing the request.",
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await driver.verifyConnectivity();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(
      "Unable to connect to CognoDB:",
      error.message
    );

    process.exit(1);
  }
};

startServer();