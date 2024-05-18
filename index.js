require("dotenv").config();
const express = require("express");
const cors = require("cors");

const uni = require("./structdata/uniScript");
const program = require("./structdata/programScript");
const major = require("./structdata/majorScript");
const { arrayUniqueForFilters } = require("./structdata/arrayUnique");
//
const uniServices = require("./src/services/uni");
const programServices = require("./src/services/program");
//
const { uniCoursesBlock, uinCoursesStyle } = require("./src/HTMLBlocks/uni");
const { programUniversitiesBlock, ProgramUniversitiesStyle } = require("./src/HTMLBlocks/program");
//
const getNewData = async uniExistingData => {
  let newUniData = [];
  let newProgData = [];
  let newMajorData = [];
  let offset = "";
  let count = 0;
  do {
    const response = await fetch(`${process.env.AIRTABLE_URL}/main${offset ? "?offset=" + offset : ""}`, {
      method: "GET",
      headers: { "Authorization": `Bearer ${process.env.AIRTABLE_AUTH_KEY}` },
    });
    const data = await response.json();
    offset = data.offset ?? "";
    count += data.records.length;
    if (!response.ok) console.log(data);
    data.records.forEach(record => {
      if (!newProgData.some(item => item.fields.id === record.fields.code)) {
        newProgData.push({ fields: { id: record.fields.code, name: record.fields.program_name ?? "" } });
      }
      if (!newUniData.some(item => item.fields.name === record.fields.uni_name)) {
        newUniData.push({ fields: { name: record.fields.uni_name, type: record.fields.uni_type, accredited_by: record.fields.accredited_by } });
      }
      if (!newMajorData.some(item => item.fields.id === record.fields.code)) {
        const uni = uniExistingData.filter(uni => uni.fields.name === record.fields.uni_name);
        if (uni.length > 1)
          console.log(
            "something wrong! a major cannot have more than 1 university!\n",
            "major is: ",
            record.fields,
            `\n major's universities: `,
            uni
          );
        else if (uni.length === 0) console.log("major does not have a university!\n", "major is: ", record.fields, `\n major's universities: `, uni);
        else if (uni.length !== 1)
          console.log("something wrong! Write a better code next time\n", "at major: ", record.fields, `\n major's universities: `, uni);
        newMajorData.push({
          fields: {
            id: record.fields.id.toString(),
            name: record.fields.major_name,
            ranking: record.fields.ranking,
            study_field: record.fields.study_field,
            degree: record.fields.degree,
            study_mode: record.fields.study_mode,
            full_cost: record.fields.full_cost,
            duration: record.fields.duration,
            location: record.fields.location,
            program_id: record.fields.code,
            uni_id: uni[0]?.fields.id.toString() ?? "",
          },
        });
      }
    });
  } while (offset && offset !== "");

  console.log("total rows: ", count);
  console.log("program new data", newUniData.length);
  console.log("program new data", newProgData.length);
  console.log("program new data", newMajorData.length);
  return { newUniData, newProgData, newMajorData };
};
//

// arrayUniqueForFilters("study_field");
//
const structUniDatabase = async () => {
  // const uniExistingData = await uni.getExistingData();
  // retrieve all data
  const { newUniData, newProgData, newMajorData } = await getNewData(uniExistingData);

  // university table
  await uni.addNewData(uniExistingData, newUniData);

  // program table
  const programExistingData = await program.getExistingData();
  await program.addNewData(programExistingData, newProgData);

  // major table
  const majorExistingData = await major.getExistingData();
  await major.addNewData(majorExistingData, newMajorData);
};

// server
const app = express();

// Use CORS middleware
app.use(cors());

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
  } catch (error) {
    console.log("log:", error.message);
    res.status(500).send({ output: "Internal Server Error, Please refresh the page" });
  }
});
app.get("/dropdown/list", async (req, res) => {
  const { field } = req.query;
  try {
    if (field) {
      const list = await arrayUniqueForFilters(field);
      const listOption = list.map(option => `<option value="${option}">${option}</option>`).join("\n");
      res.status(200).send({ data: listOption });
    } else console.error("field param is required!");
  } catch (error) {
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
  } catch (error) {
    console.log("log:", error.message);
    res.status(500).send({ output: "Internal Server Error, Please refresh the page" });
  }
});

//
app.get("/", async (req, res) => {
  res.status(200).send("Hi there!");
});
// Start the server
const port = parseInt(process.env.PORT) || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
