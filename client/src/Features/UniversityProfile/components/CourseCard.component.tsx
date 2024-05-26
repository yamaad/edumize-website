import { Box, Typography } from "@mui/material";
import { CourseModel } from "../../../services/airTable/endpoints/course";

interface IUniversityCourseCard extends CourseModel {}
const UniversityCourseCard = ({ name, fullCost, duration, studyMode }: IUniversityCourseCard) => {
  const years = duration.toLowerCase().includes("years") ? duration.toLowerCase().split("years")[0] + ` Years` : undefined;
  const year = years ?? duration.toLowerCase().includes("year") ? duration.toLowerCase().split("year")[0] + ` Years` : undefined;
  const semester = years
    ? duration.toLowerCase().split("years").length > 1
      ? duration.toLowerCase().split("years")[1]
      : ""
    : year
    ? duration.toLowerCase().split("year").length > 1
      ? duration.toLowerCase().split("year")[1]
      : ""
    : "";
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
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2">{studyMode || "-"}</Typography>
      </Box>
      <Box>
        <Typography variant="body1">
          MYR {fullCost} <strong>/</strong> {year ?? duration}
        </Typography>
        <Typography>{semester.length > 0 ? semester : ""}</Typography>
      </Box>
    </Box>
  );
};
export default UniversityCourseCard;
