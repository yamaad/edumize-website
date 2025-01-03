import { Button, Stack, Typography } from "@mui/material";
import { RootState } from "redux/store";
import { ConnectedProps, connect } from "react-redux";
import { setSelectedCourseFee } from "redux/institute/institute.slice";
import DiscoverPanel from "./components/DiscoverPanel.compnent";
import { useState } from "react";
import ComparePanel from "./components/ComparePanel.component";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { Accommodation } from "./components/Accommodation.component";
import { useTranslation } from "react-i18next";

// map state to props
const mapStateToProps = (state: RootState) => ({
  currentInstitute: state.institute.currentInstitute,
  courseFeeList: state.institute.courseFeeList,
  selectedCourse: state.institute.selectedCourse,
  selectedCourseFee: state.institute.selectedCourseFee,
});

// map dispatch to props
const mapDispatchToProps = {
  setSelectedCourseFee,
};

// connect to redux
const connector = connect(mapStateToProps, mapDispatchToProps);

// define props
type PropsFromRedux = ConnectedProps<typeof connector>;

//--------------
// interfaces
//--------------
interface InstitutesCoursesAndFees extends PropsFromRedux {}
//---------------
// component
//---------------
const InstitutesCoursesAndFees = ({}: InstitutesCoursesAndFees) => {
  //---------------
  // local state
  //---------------
  const [tabValue, setTabValue] = useState(0);
  //---------------
  // hooks
  //---------------
  const { t } = useTranslation();
  //---------------
  // handlers
  //---------------
  const handleTabChange = (tabValue: number) => {
    setTabValue(tabValue);
  };

  return (
    <Stack gap={3}>
      <Stack sx={{ textAlign: "center" }} gap={1}>
        <Typography variant="h5" color={"primary"}>
          {t("Customize You Study Package")}
        </Typography>
        <Typography variant="bodyNormal" color={"content.400"}>

        </Typography>
      </Stack>
      <Stack gap={1}>
        <Stack direction={"row"} gap={1}>
          <Button
            variant={tabValue === 0 ? "contained" : "outlined"}
            color="secondary"
            sx={{ color: tabValue === 0 ? "content.0" : "secondary", textTransform: "capitalize", fontWeight: "700", borderRadius: 5, py: 0 }}
            onClick={() => handleTabChange(0)}
          >
            {t("Discover")}
          </Button>
          <Button
            variant={tabValue === 1 ? "contained" : "outlined"}
            color="secondary"
            sx={{
              color: tabValue === 1 ? "content.0" : "secondary",
              textTransform: "capitalize",
              fontWeight: "700",
              borderRadius: 5,
              py: 0,
            }}
            onClick={() => handleTabChange(1)}
          >
            {t("Compare")}
          </Button>
        </Stack>

        {tabValue === 0 && <DiscoverPanel />}

        {tabValue === 1 && <ComparePanel setTabValue={setTabValue} />}
      </Stack>
      <AddCircleOutlinedIcon color="secondary" sx={{ alignSelf: "center", fontSize: "142px" }} />
      <Accommodation />
    </Stack>
  );
};

export { InstitutesCoursesAndFees };
export default connector(InstitutesCoursesAndFees);
