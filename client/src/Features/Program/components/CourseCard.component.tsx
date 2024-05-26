import { Box, Typography } from "@mui/material";
import { UniversityCourseModel } from "../../../services/airTable/types";

interface IProgramCourseCard extends UniversityCourseModel {}
const ProgramCourseCard = ({ name, fullCost, duration, studyMode }: IProgramCourseCard) => {
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
        gridTemplateColumns: " 3fr 5fr 2fr 1fr",
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
        rowGap: 0.5,
        columnGap: 1,
        boxShadow: "0px 18px 36px -18px rgba(0, 0, 0, 0.1), 0px 30px 45px -30px rgba(50, 50, 93, 0.25)",
      }}
    >
      <Box
        component="img"
        sx={{ maxWidth: "135px", alignSelf: "center", gridRowStart: 1, gridRowEnd: 3, justifySelf: "center" }}
        alt="University name"
        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
      />
      <Typography variant="body2" fontWeight="bold" sx={{ gridColumnStart: 2, gridColumnEnd: 4, alignSelf: "end", justifySelf: "start" }}>
        {name}
      </Typography>
      <Box
        component="img"
        sx={{ maxWidth: "45px", gridRowStart: 1, gridRowEnd: 3, gridColumnStart: 4, gridColumnEnd: 5, alignSelf: "start", justifySelf: "center" }}
        alt="University type"
        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
      />
      <Typography variant="body2" alignSelf="start" justifySelf="start">
        MYR {fullCost} <strong>/</strong> {year ?? duration}
        {semester.length > 0 ? semester : ""}
      </Typography>
      <Typography variant="body2" sx={{ justifySelf: "end" }}>
        {studyMode || "-"}
      </Typography>
    </Box>
  );
};
export default ProgramCourseCard;
