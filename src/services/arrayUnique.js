const arrayUniqueForFilters = async field => {
  let offset = "";
  let array = [];
  try {
    const response = await fetch(`${process.env.AIRTABLE_URL}/major/listRecords`, {
      method: "POST",
      headers: { "Authorization": `Bearer ${process.env.AIRTABLE_AUTH_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: [field],
        sort: [{ field, direction: "asc" }],
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      console.log({ data });
      throw new Error("error at arrayUniqueForFilters");
    }
    array = new Set(data.records.map(record => (record.fields[`${field}`] ? record.fields[`${field}`].toLowerCase().trim() : "")));
    array = [...array];
    offset = data.offset ?? "";
    while (offset && offset !== "") {
      const response = await fetch(`${process.env.AIRTABLE_URL}/major/listRecords`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${process.env.AIRTABLE_AUTH_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: [field],
          sort: [{ field, direction: "asc" }],
          filterByFormula: `

        AND(
              ${array.map(value => `TRIM(LOWER({${field}})) != TRIM(LOWER("${value}"))`).join(",")}

          )
        `,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.log({ data });
        throw new Error("error at arrayUniqueForFilters");
      }
      const newSet = new Set(data.records.map(record => record.fields[`${field}`].toLowerCase().trim()));
      array = [...array, ...newSet];
      offset = data.offset ?? "";
    }
  } catch (error) {
    console.log(error);
  }
  array = array.filter(value => value.length);
  // const updateResponse = await fetch(`${process.env.AIRTABLE_URL}/unique`, {
  //   method: "PATCH",
  //   headers: { "Authorization": `Bearer ${process.env.AIRTABLE_AUTH_KEY}`, "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     "records":[
  //       {
  //         id:"rec5R7apjNbQKh28y",
  //         fields:JSON.parse(`{"${field}":"${array.join(",")}"}`)
  //         }

  //     ]
  //   }),
  // });
  // const updatedData = await updateResponse.json();
  // if(!updateResponse.ok) console.log(updatedData)
  return array;
};

module.exports = {
  arrayUniqueForFilters,
};
