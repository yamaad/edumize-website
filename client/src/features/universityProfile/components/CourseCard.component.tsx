import { Box, Paper, Typography } from "@mui/material";
import { CourseModel } from "../../../redux/services/airtable/course/types";
import { RootState } from "redux/store";
import { ConnectedProps, connect } from "react-redux";

// map state to props
const mapStateToProps = (state: RootState) => ({
  currency: state.currency.currency,
  currencyRate: state.currency.rate,
});

// map dispatch to props
const mapDispatchToProps = {};

// connect to redux
const connector = connect(mapStateToProps, mapDispatchToProps);

// define props
type PropsFromRedux = ConnectedProps<typeof connector>;

interface IUniversityCourseCard extends PropsFromRedux, CourseModel {}
const UniversityCourseCard = ({ name, fullCost, duration, studyMode, currencyRate, currency }: IUniversityCourseCard) => {
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
      }}
    >
      <Box sx={{ textAlign: "start" }}>
        <Typography fontSize="12px" fontWeight="bold">
          {name}
        </Typography>
        <Typography fontSize="12px">{studyMode || "-"}</Typography>
      </Box>
      <Box>
        <Typography fontSize="12px">
          {currency} {Math.ceil(fullCost * currencyRate).toLocaleString()} <strong>/</strong> {year ?? duration}
        </Typography>
        <Typography fontSize="12px">{semester.length > 0 ? semester : ""}</Typography>
      </Box>
    </Paper>
  );
};
export { UniversityCourseCard };
export default connector(UniversityCourseCard);