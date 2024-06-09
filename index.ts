import express from "express";
import cors from "cors";
import path from "path";
import { config } from "dotenv";
import { conn } from "./src/db/config";
import server from "./src/server";

config();

const app = express();
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    await conn.sync({ force: true });
    
    server.listen(PORT, () => {
      console.log("Server listening on port", PORT);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

startServer();
