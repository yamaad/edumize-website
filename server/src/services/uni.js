const getUniCourses = data => {

};
const getData = async (id, search = "", offset = "", studyLevel = "", studyField = "", sort, studyMode = "") => {
  let filterByFormula = `AND(
    {uni_id}=${id},
    SEARCH(LOWER("${search}"),LOWER({name}))
    `;
  if (studyLevel && studyLevel !== "") filterByFormula += ` ,TRIM(LOWER({degree}))=LOWER("${studyLevel}")`;
  if (studyField && studyField !== "") filterByFormula += ` ,TRIM(LOWER({study_field}))=LOWER("${studyField}")`;
  if (studyMode && studyMode !== "") filterByFormula += ` ,TRIM(LOWER({study_mode}))=LOWER("${studyMode}")`;
  filterByFormula += `)`;
  let query = {
    pageSize: 5,
    sort: [{ field: sort.split("-")[0], direction: sort.split("-")[1] }],
    fields: ["name", "study_mode", "duration", "full_cost"],
    filterByFormula,
    offset,
  };
  try {
    const response = await fetch(`${process.env.AIRTABLE_URL}/major/listRecords`, {
      method: "POST",
      headers: { "Authorization": `Bearer ${process.env.AIRTABLE_AUTH_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify(query),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error.message);
    const output = getUniCourses(data.records);
    return { output, offset: data.offset };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = { getData };
