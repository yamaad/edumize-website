import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { errorHandler } from "./src/common/middlewares/errorhandler";
import connectDB from "./src/common/config/db/mongoDb";
import { currencyRouter } from "./src/modules/currency/currency.router";
import { leadRouter } from "./src/modules/lead/lead.router";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Connect to MongoDB
connectDB();

// server
const app = express();

// Use CORS middleware
app.use(cors());

// use logger middleware
//TODO app.use(loggerMiddleware);
// use routers
app.use("/api/currency", currencyRouter);
app.use("/api/lead", express.json(), leadRouter);

// serve static file
app.use(express.static(__dirname));
app.get("/client", (req, res) => {
  res.set("Cache-Control", "no-store");
  res.sendFile(path.join(__dirname, process.env.CLIENT_PATH || ""));
});

// Use error handler middleware
app.use(errorHandler);
// Start the server
const port = parseInt(process.env.PORT ?? "") || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
