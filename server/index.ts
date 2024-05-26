import express from "express";
// import "../.env";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import cors from "cors";
import path from "path";
//
const programServices = require("./src/services/program");
//
const { programUniversitiesBlock, ProgramUniversitiesStyle } = require("./src/HTMLBlocks/program");

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

//  program
app.get("/program/elements", (req, res) => {
  const block = programUniversitiesBlock();
  const style = ProgramUniversitiesStyle();
  res.status(200).send({ block, style });
});

app.post("/program/:id/course", async (req, res) => {
  try {
    const { id } = req.params;
    const { search, offset, sort, studyMode } = req.query;
    const { output, offset: newOffset } = await programServices.getProgramData(id, search, offset ?? "", sort, studyMode);
    res.status(200).send({ output, offset: newOffset });
  } catch (error: any) {
    console.log("log:", error.message);
    res.status(500).send({ output: "Internal Server Error, Please refresh the page" });
  }
});

// Start the server
const port = parseInt(process.env.PORT ?? "") || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
