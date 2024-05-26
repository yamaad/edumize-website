import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import cors from "cors";
import path from "path";

// server
const app = express();

// Use CORS middleware
app.use(cors());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/dist/assets")));

//
app.get("/client", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/main.js"));
});

// Start the server
const port = parseInt(process.env.PORT ?? "") || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
