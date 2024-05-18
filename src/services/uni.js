const getUniCourses = data => {
  const html = data.map(data => {
    const years = data.fields.duration.toLowerCase().includes("years") ? data.fields.duration.toLowerCase().split("years")[0] + ` Years` : undefined;
    const year =
      years ?? data.fields.duration.toLowerCase().includes("year") ? data.fields.duration.toLowerCase().split("year")[0] + ` Years` : undefined;
    const semester = years
      ? data.fields.duration.toLowerCase().split("years").length > 1
        ? data.fields.duration.toLowerCase().split("years")[1]
        : ""
      : year
      ? data.fields.duration.toLowerCase().split("year").length > 1
        ? data.fields.duration.toLowerCase().split("year")[1]
        : ""
      : "";
    return `
      <div class="card course-item">
      <div style="text-align: start;">
      <h6 class="prog-name">${data.fields.name}</h6>
      <p class="study-mode">${data.fields.study_mode || "-"}</p>
      </div>
      <div>
      <p class="full-cost"> MYR  ${data.fields.full_cost.toLocaleString()} <strong>/</strong>  ${year ?? data.fields.duration}</p>
      <p class="duration">${semester.length > 0 ? `(${semester})` : ""}</p>
      </div>
      </div>`;
  });
  const output = data.length === 0 ? `<h3>No Matching Records</h3>` : html.join("\n");
  return output;
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
