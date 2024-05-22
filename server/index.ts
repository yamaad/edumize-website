import express from "express";
import "../.env";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import cors from "cors";
import path from "path";
//
const uniServices = require("./src/services/uni");
const programServices = require("./src/services/program");
//
const { uniCoursesBlock, uinCoursesStyle } = require("./src/HTMLBlocks/uni");
const { programUniversitiesBlock, ProgramUniversitiesStyle } = require("./src/HTMLBlocks/program");
const { arrayUniqueForFilters } = require("./src/services/arrayUnique");

// server
const app = express();

// Use CORS middleware
app.use(cors());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/dist/assets")));

app.get("/uni/elements", (req, res) => {
  const block = uniCoursesBlock();
  const style = uinCoursesStyle();
  res.status(200).send({ block, style });
});

app.get("/uni/:id/course", async (req, res) => {
  try {
    const { id } = req.params;
    const { search, offset, studyLevel, studyField, sort, studyMode } = req.query;
    const { output, offset: newOffset } = await uniServices.getData(id, search, offset ?? "", studyLevel, studyField, sort, studyMode);
    res.status(200).send({ output, offset: newOffset });
  } catch (error: any) {
    console.log("log:", error.message);
    res.status(500).send({ output: "Internal Server Error, Please refresh the page" });
  }
});
app.get("/dropdown/list", async (req, res) => {
  const { field } = req.query;
  try {
    if (field) {
      const list = await arrayUniqueForFilters(field);
      const listOption = list.map((option: any) => `<option value="${option}">${option}</option>`).join("\n");
      res.status(200).send({ data: listOption });
    } else console.error("field param is required!");
  } catch (error: any) {
    console.log("log:", error.message);
    res.status(500).send({ error });
  }
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

//

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/assets"));
});

// Start the server
const port = parseInt(process.env.PORT ?? "") || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
