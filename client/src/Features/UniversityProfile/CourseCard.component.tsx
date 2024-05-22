import { Box, Typography } from "@mui/material";

interface ICourseCard {}
const CourseCard = ({}: ICourseCard) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: " 3fr 1fr",
        gridTemplateRows: "auto",
        justifyContent: "space-between",
        backdropFilter: "blur(20px)",
        backgroundColor: "rgba(230, 230, 230, .8)",
        border: "1px solid #005360",
        borderRadius: 2.5,
        textAlign: "center",
        p: 2,
        pl: 1,
        alignItems: "start",
        justifyItems: "stretch",
        rowGap: 0.5,
        columnGap: 1,
        boxShadow: "0px 18px 36px -18px rgba(0, 0, 0, 0.1), 0px 30px 45px -30px rgba(50, 50, 93, 0.25)",
      }}
    >
      <Box sx={{ textAlign: "start" }}>
        <Typography variant="h6">$data.fields.name</Typography>
        <Typography variant="body2">data.fields.study_mode || "-"</Typography>s
      </Box>
      <Box>
        <Typography>
          {" "}
          MYR data.fields.full_cost.toLocaleString <strong>/</strong> year ?? data.fields.duration
        </Typography>
        <Typography>semester.length `{">"}` 0 ? (semester) : ""</Typography>
      </Box>
    </Box>
  );
};
export default CourseCard;
