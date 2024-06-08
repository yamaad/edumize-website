import { Box, Button, CircularProgress, Menu, MenuItem, Skeleton, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useGetLanguageInstituteCourseFeeListQuery, useGetLanguageInstituteCourseListQuery } from "redux/institute/institute.api";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RootState } from "redux/store";
import { ConnectedProps, connect } from "react-redux";
import { setSelectedCourseFee } from "redux/institute/institute.slice";
import { InstituteCourseFeeModel, InstituteCourseModel, InstituteModel } from "redux/institute/institute.model";
import InstituteCourseCard, { InstituteCourseCard as InstituteCourseCardComponent } from "./InstituteCourseCard.component";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CurrencyMenu from "components/currencyMenu/CurrencyMenu";
import { WheelSelect } from "components/selectWheel/WheelSelect.component";

// map state to props
const mapStateToProps = (state: RootState) => ({
  instituteList: state.institute.instituteList,
  currentInstitute: state.institute.currentInstitute,
  courseFeeList: state.institute.courseFeeList,
  selectedCourse: state.institute.selectedCourse,
  selectedCourseFee: state.institute.selectedCourseFee,
  courseList: state.institute.courseList,
  currency: state.currency.currency,
  currencyRate: state.currency.rate,
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
interface ComparePanelProps extends PropsFromRedux {
  setTabValue: Dispatch<SetStateAction<number>>;
}
//---------------
// component
//---------------
const ComparePanel = ({
  instituteList,
  currentInstitute,
  courseFeeList,
  selectedCourse,
  setSelectedCourseFee,
  courseList,
  currency,
  currencyRate,
  selectedCourseFee,
  setTabValue,
}: ComparePanelProps) => {
  //-------------
  // local states
  //-------------
  const [selectedCourseFeeList, setSelectedCourseFeeList] = useState<InstituteCourseFeeModel[]>();
  const [comparedInstitute, setComparedInstitute] = useState<InstituteModel>();
  const [comparedCourse, setComparedCourse] = useState<InstituteCourseModel>();
  const [selectedTotalFee, setSelectedTotalFee] = useState<number>(0);
  const [comparedTotalFee, setComparedTotalFee] = useState<number>(0);
  const [comparedCourseFee, setComparedCourseFee] = useState<InstituteCourseFeeModel>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  //-------------
  // constants
  //-------------
  const openMenu = Boolean(anchorEl);

  //-------------
  // hooks
  //-------------
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { isLoading } = useGetLanguageInstituteCourseFeeListQuery(
    `filterByFormula=OR({institute_id}="${currentInstitute?.id}",{institute_id}="${comparedInstitute?.id}")`,
    {
      skip: !currentInstitute || !comparedInstitute,
    }
  );
  useGetLanguageInstituteCourseListQuery(`filterByFormula=OR(${courseFeeList?.map(courseFee => `{id}="${courseFee.courseId}"`).join(",")})`, {
    skip: !courseFeeList,
  });

  //-------------
  // triggers
  //-------------
  useEffect(() => {
    if (currentInstitute) {
      const filteredList = instituteList.filter(value => value.id !== currentInstitute?.id);
      if (filteredList.length > 0) setComparedInstitute(filteredList[0]);
    }
  }, [currentInstitute, instituteList]);

  useEffect(() => {
    setSelectedCourseFeeList(courseFeeList.filter(value => value.courseId === selectedCourse?.id && value.instituteId === currentInstitute?.id));
  }, [selectedCourse]);

  useEffect(() => {
    if (selectedCourseFee) {
      setSelectedTotalFee(
        selectedCourseFee.registrationFee +
          selectedCourseFee.placementTest +
          selectedCourseFee.visaAndInsurance +
          selectedCourseFee.booksAndMaterials +
          selectedCourseFee.immigrationClearanceAndAirportPickUp +
          selectedCourseFee.discountedFee
      );
    }
  }, [selectedCourseFee]);
  useEffect(() => {
    if (comparedCourseFee) {
      setComparedTotalFee(
        comparedCourseFee.registrationFee +
          comparedCourseFee.placementTest +
          comparedCourseFee.visaAndInsurance +
          comparedCourseFee.booksAndMaterials +
          comparedCourseFee.immigrationClearanceAndAirportPickUp +
          comparedCourseFee.discountedFee
      );
    }
  }, [comparedCourseFee]);
  //-------------
  // handlers
  //-------------
  const handleToggleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    openMenu ? setAnchorEl(null) : setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handComparedInstituteChange = (value: InstituteModel) => {
    setComparedInstitute(value);
    setAnchorEl(null);
  };

  return (
    <Stack borderRadius={2} p={2} gap={2} maxWidth={"100%"} bgcolor={"primary.100"} mt={1}>
      <Button
        variant="contained"
        color="success"
        sx={{
          color: "content.0",
          textTransform: "capitalize",
          borderRadius: 6,
          width: "fit-content",
          px: 3,
          py: 1,
          position: "fixed",
          bottom: 16,
          left: "50vw",
          zIndex: 2,
        }}
        onClick={() => {
          const encodedMessage = encodeURIComponent("Hello Edumize, I would to your consultation on which language institute I should choose.");

          window.open(`${import.meta.env.VITE_EDUMIZE_WHATSAPP_URL}${encodedMessage}`, "_self");
        }}
      >
        Ask for help
      </Button>
      <Stack direction={"row"} gap={4} flexWrap={"wrap"} justifyContent="space-between" alignItems={"center"}>
        <Stack gap={1}>
          <Typography
            variant="h5"
            color="content.600"
            sx={{ whiteSpace: "nowrap", borderBottom: "1px solid #9F9F9F", borderTop: "1px solid #9F9F9F", p: 1, borderRadius: 1 }}
          >
            {currentInstitute?.name || <Skeleton width={200} />}
          </Typography>
          <Stack>
            <Typography variant="h4" color="content.500">
              Course
            </Typography>

            <Stack sx={{ px: 2, py: 1, borderRadius: 3 }}>
              <InstituteCourseCard />
            </Stack>
          </Stack>
        </Stack>
        <Stack gap={2}>
          <Button variant="text" onClick={handleToggleMenu} sx={{ textTransform: "capitalize", p: 0, whiteSpace: "nowrap" }}>
            <Typography variant="h5" color="primary.900">
              {comparedInstitute?.name || <Skeleton width={200} />}
            </Typography>

            <KeyboardArrowDownIcon sx={{ fontSize: "40px" }} />
          </Button>
          <Menu open={openMenu} onClose={handleCloseMenu} anchorEl={anchorEl} sx={{ mt: 1, maxHeight: "500px" }}>
            {currentInstitute &&
              instituteList.map((value, index) =>
                value.id !== currentInstitute?.id && value.id !== comparedInstitute?.id ? (
                  <MenuItem key={index} onClick={() => handComparedInstituteChange(value)}>
                    <Typography variant="h6" color="primary.900">
                      {value.name}
                    </Typography>
                  </MenuItem>
                ) : (
                  <Box key={index}> </Box>
                )
              )}
          </Menu>
          <Stack>
            <Typography variant="h4" color="primary.900">
              Course
            </Typography>

            <Stack sx={{ px: 2, py: 1, borderRadius: 3 }}>
              <InstituteCourseCardComponent
                currentInstitute={comparedInstitute}
                selectedCourse={comparedCourse}
                courseList={courseList}
                setSelectedCourse={setComparedCourse}
                courseFeeList={courseFeeList}
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      {selectedCourseFeeList && (
        <Stack gap={2}>
          <Typography variant="h4" color="content.500">
            Months
          </Typography>
          <WheelSelect
            valueRange={selectedCourseFeeList?.map(course => course.duration)}
            onValueChange={value => {
              setSelectedCourseFee(
                courseFeeList.filter(courseFee => courseFee.instituteId === currentInstitute?.id && courseFee.duration === value)[0]
              );
              setComparedCourseFee(
                courseFeeList.filter(courseFee => courseFee.instituteId === comparedInstitute?.id && courseFee.duration === value)[0]
              );
            }}
            renderTrigger={[selectedCourse, comparedCourse, courseFeeList, isLoading, selectedCourseFeeList, comparedInstitute]}
          />
        </Stack>
      )}
      {selectedCourseFeeList && (
        <Stack gap={1}>
          <Stack direction={"row"} alignItems={"end"} gap={1} pr={2} justifyContent={"space-between"}>
            <Stack direction={"row"} flexWrap={"wrap"} alignItems={"end"} gap={1}>
              <Typography variant="h4" color="content.500">
                Total Fees
              </Typography>
              <Typography variant="bodyLightXS" color="content.500">
                Including Miscellaneous fees
              </Typography>
            </Stack>
            <Stack flexGrow={1} alignItems={"flex-end"}>
              <CurrencyMenu />
            </Stack>
          </Stack>
          <Stack>
            <Stack direction={"row"} justifyContent={"stretch"} px={{ xs: 0, md: 5 }} flexWrap={"wrap"}>
              <Stack
                flexGrow={1}
                border={"1px solid #9F9F9F"}
                textAlign={"center"}
                gap={1}
                justifyContent={"center"}
                borderRadius={5}
                py={5}
                px={{ xs: 1, lg: 5 }}
                sx={{
                  position: "relative",
                  "::after": {
                    content: '""',
                    position: "absolute",
                    borderRight: "2px solid #9F9F9F",
                    borderBottom: "1px solid #9F9F9F",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100.5%",
                    backgroundColor: "primary.100",
                    transform: "skewX(45deg)",
                    borderTopLeftRadius: 200,
                    zIndex: 1,
                  },
                }}
              >
                <Typography variant={isMobileScreen ? "h4" : "h2"} color={"content.600"} sx={{ whiteSpace: "nowrap", zIndex: 2 }}>
                  {isLoading || !selectedTotalFee ? <Skeleton /> : currency + ` ` + Math.ceil(selectedTotalFee * currencyRate).toLocaleString()}
                </Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  disabled={!currentInstitute}
                  onClick={() => setTabValue(0)}
                  sx={{ borderRadius: 5, backgroundColor: "content.0", textTransform: "capitalize", mx: { xs: 0, sm: 5 }, zIndex: 2 }}
                >
                  {currentInstitute ? "Get Details" : <CircularProgress color="secondary" />}
                </Button>
              </Stack>
              <Stack
                flexGrow={1}
                gap={1}
                textAlign={"center"}
                justifyContent={"center"}
                borderRadius={5}
                py={5}
                px={{ xs: 1, lg: 5 }}
                sx={{
                  backgroundColor: "content.0",
                  position: "relative",
                  "::after": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "content.0",
                    transform: "skewX(45deg)",
                    borderEndEndRadius: 200,
                    zIndex: 0,
                  },
                }}
              >
                <Typography variant={isMobileScreen ? "h4" : "h2"} color={"primary"} sx={{ whiteSpace: "nowrap", zIndex: 1 }}>
                  {isLoading ? (
                    <Skeleton />
                  ) : comparedCourseFee ? (
                    currency + ` ` + Math.ceil(comparedTotalFee * currencyRate).toLocaleString()
                  ) : (
                    "Not Offered"
                  )}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={!comparedInstitute}
                  onClick={() => {
                    window.open(
                      `${import.meta.env.VITE_EDUMIZE_CLIENT_URL}/institutes/${comparedInstitute?.name.trim().replaceAll(" ", "-").toLowerCase()}`,
                      "_self"
                    );
                  }}
                  sx={{ borderRadius: 5, textTransform: "capitalize", color: "content.0", mx: { xs: 0, sm: 5 }, zIndex: 1 }}
                >
                  {comparedInstitute ? "Visit Page" : <CircularProgress color="secondary" />}
                </Button>
              </Stack>
            </Stack>
            <Typography variant="bodyLightXS" color={"primary.900"}>
              Fees Presented Do Not Include Edumize Discount
            </Typography>
          </Stack>
        </Stack>
      )}
      <Stack gap={0.5}>
        <Typography
          variant="bodyNormal"
          color="primary.main"
          component="a"
          href=""
          sx={{ alignSelf: "start", fontWeight: 300, textTransform: "capitalize" }}
        >
          Terms & Conditions
        </Typography>
      </Stack>
    </Stack>
  );
};

export { ComparePanel };
export default connector(ComparePanel);
