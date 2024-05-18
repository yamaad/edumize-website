let uniRecords = [];
const getProgramUniversities = data => {
  const html = data.map(data => {
    const uni = uniRecords.find(record => record.id.toString() === data.fields.uni_id);
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
    <div class="card course-item program">
    <img id="uni-logo" class="uni-logo" src="${uni.image}" alt="${uni.name}"/>
    <h6 class="course-name">${data.fields.name}</h6>
    <img id="uni-type" class="uni-type" src="${uni.type}" alt="type"/>
    <p class="full-cost">MYR ${data.fields.full_cost.toLocaleString()} <strong>/</strong>  ${year ?? data.fields.duration} ${
      semester.length > 0 ? `(${semester})` : ""
    }</p>
    <p class="study-mode">${data.fields.study_mode || "-"}</p>
  </div>`;
  });
  const output = data.length === 0 ? `<h3>No Matching Records</h3>` : html.join("\n");
  return output;
};
const getImage = async () => {
  let uniQuery = { fields: ["id", "name", "type", "image"] };
  let uniTypeQuery = { fields: ["type", "image"] };

  const uniData = fetch(`${process.env.AIRTABLE_URL}/university/listRecords`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${process.env.AIRTABLE_AUTH_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(uniQuery),
  }).then(res => res.json());

  const typeData = fetch(`${process.env.AIRTABLE_URL}/university_type_image/listRecords`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${process.env.AIRTABLE_AUTH_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(uniTypeQuery),
  }).then(res => res.json());
  await Promise.all([uniData, typeData]).then(data => {
    if (data[0].error) throw new Error(data[0].error.message);
    if (data[1].error) throw new Error(data[1].error.message);
    uniRecords = data[0].records.map(record => {
      return {
        id: record.fields.id,
        image: record.fields.image ? record.fields.image[0].thumbnails.full.url : record.fields.name,
        type: data[1].records.find(typeRecord => typeRecord.fields.type === record.fields.type).fields.image[0].thumbnails.full.url,
      };
    });
  });
};
//
const getProgramData = async (id, search = "", offset = "", sort, studyMode = "") => {
  let filterByFormula = `AND(
    {program_id}="${id}",
    SEARCH(LOWER("${search}"),LOWER({name}))
    `;
  if (studyMode && studyMode !== "") filterByFormula += ` ,TRIM(LOWER({study_mode}))=LOWER("${studyMode}")`;
  filterByFormula += `)`;
  let query = {
    pageSize: 5,
    sort: [{ field: sort.split("-")[0], direction: sort.split("-")[1] }],
    fields: ["name", "study_mode", "duration", "full_cost", "uni_id"],
    filterByFormula,
    offset,
  };
  try {
    await getImage();
    const response = await fetch(`${process.env.AIRTABLE_URL}/major/listRecords`, {
      method: "POST",
      headers: { "Authorization": `Bearer ${process.env.AIRTABLE_AUTH_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify(query),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error.message);
    const output = getProgramUniversities(data.records);
    return { output, offset: data.offset };
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = { getProgramData };
