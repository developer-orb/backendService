import { config } from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
// import { conn } from "./db/config";
import server from "./server";

config();

const PORT = process.env.PORT || 3001;

server.use(cors());

if (process.env.NODE_ENV === "production") {
  server.use(express.static(path.join(__dirname, "client/build")));
}

console.log(__dirname, "client/build");

async function startServer() {
  try {
    // await conn.sync({ force: true });
    // await conn.sync({ force: false });
    server.listen(PORT, () => {
      console.log("Server listening on port", PORT);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

startServer();
