import express from "express";
import { db } from "./db/client.js";
import { sql } from "drizzle-orm";

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/health/db", async (_req, res) => {
  try {
    await db.execute(sql`SELECT 1`);
    res.json({ status: "ok", database: "reachable" });
  } catch (err) {
    console.error(err);
    res.status(503).json({
      status: "error",
      database: "unreachable",
    });
  }
});

app.listen(port, "0.0.0.0", () => {
    console.log(`API listening on port ${port}`);
});