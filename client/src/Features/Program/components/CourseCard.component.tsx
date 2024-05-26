import { Box, Paper, Typography } from "@mui/material";
import { CourseModel } from "../../../redux/services/airtable/course/types";

export interface IProgramCourseCard extends CourseModel {
  typeImage: string;
  logoImage: string;
}
const ProgramCourseCard = ({ name, fullCost, duration, studyMode, typeImage, logoImage }: IProgramCourseCard) => {
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
    <Paper
      elevation={3}
      sx={{
        display: "grid",
        gridTemplateColumns: " auto 5fr 2fr auto",
        gridTemplateRows: "auto auto",
        justifyContent: "space-between",
        backdropFilter: "blur(20px)",
        backgroundColor: "rgba(230, 230, 230, .8)",
        border: "1px solid #ee8c00",
        borderRadius: 2.5,
        textAlign: "center",
        pt: 1,
        pb: 0.5,
        px: 1,
        alignItems: "start",
        justifyItems: "stretch",
        rowGap: 0,
        columnGap: 0.5,
      }}
    >
      <Box
        component="img"
        sx={{ maxWidth: { xs: "85px", sm: "135px" }, alignSelf: "center", gridRowStart: 1, gridRowEnd: 3, justifySelf: "center" }}
        alt={logoImage}
        src={logoImage}
      />
      <Typography fontSize="12px" fontWeight="bold" sx={{ gridColumnStart: 2, gridColumnEnd: 4, alignSelf: "end", justifySelf: "start" }}>
        {name}
      </Typography>
      <Box
        component="img"
        sx={{ maxWidth: "30px", gridRowStart: 1, gridRowEnd: 3, gridColumnStart: 4, gridColumnEnd: 5, alignSelf: "start", justifySelf: "center" }}
        alt={typeImage}
        src={typeImage}
      />
      <Typography fontSize="12px" alignSelf="start" justifySelf="start">
        MYR {fullCost} <strong>/</strong> {year ?? duration}
        {semester.length > 0 ? semester : ""}
      </Typography>
      <Typography fontSize="12px" sx={{ justifySelf: "end" }}>
        {studyMode || "-"}
      </Typography>
    </Paper>
  );
};
export default ProgramCourseCard;
