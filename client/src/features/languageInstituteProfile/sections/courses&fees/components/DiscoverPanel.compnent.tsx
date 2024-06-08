import { Skeleton, Stack, Typography } from "@mui/material";
import { useGetLanguageInstituteCourseFeeListQuery, useGetLanguageInstituteCourseListQuery } from "redux/institute/institute.api";
import { useEffect, useState } from "react";
import { RootState } from "redux/store";
import { ConnectedProps, connect } from "react-redux";
import { setSelectedCourseFee } from "redux/institute/institute.slice";
import { InstituteCourseFeeModel } from "redux/institute/institute.model";
import InstituteCourseCard from "./InstituteCourseCard.component";
import FeesDetailBox from "./FeesDetailBox.component";
import { WheelSelect } from "components/wheelSelect/WheelSelect.component";

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
interface DiscoverPanelProps extends PropsFromRedux {}
//---------------
// component
//---------------
const DiscoverPanel = ({ currentInstitute, courseFeeList, selectedCourse, setSelectedCourseFee, selectedCourseFee }: DiscoverPanelProps) => {
  //-------------
  // local states
  //-------------
  const [selectedCourseFeeList, setSelectedCourseFeeList] = useState<InstituteCourseFeeModel[]>();
  //-------------
  // hooks
  //-------------
  useGetLanguageInstituteCourseFeeListQuery(`filterByFormula={institute_id}="${currentInstitute?.id}"`, { skip: !currentInstitute });
  useGetLanguageInstituteCourseListQuery(`filterByFormula=OR(${courseFeeList?.map(courseFee => `{id}="${courseFee.courseId}"`).join(",")})`, {
    skip: !courseFeeList,
  });

  //-------------
  // triggers
  //-------------
  useEffect(() => {
    setSelectedCourseFeeList(courseFeeList.filter(courseFee => courseFee.courseId === selectedCourse?.id));
    setSelectedCourseFee(courseFeeList.filter(courseFee => courseFee.courseId === selectedCourse?.id)[0]);
  }, [selectedCourse]);
  return (
    <Stack borderRadius={2} p={1} gap={2} maxWidth={"100%"} bgcolor={"content.0"}>
      <Stack direction={"row"} gap={4} justifyContent="center" flexWrap={"wrap"}>
        <Stack flexGrow={1} gap={6}>
          {
            <Typography variant="h5" color="primary.900" sx={{ whiteSpace: "nowrap" }}>
              {currentInstitute?.name || <Skeleton width={200} />}
            </Typography>
          }
          <Stack gap={2}>
            <Typography variant="h4" color="content.500">
              Course
            </Typography>
            <InstituteCourseCard />
          </Stack>
          {selectedCourseFeeList && (
            <Stack gap={2}>
              <Typography variant="h4" color="content.500">
                Months
              </Typography>
              <WheelSelect
                valueRange={selectedCourseFeeList?.map(course => course.duration)}
                onValueChange={value => {
                  setSelectedCourseFee(selectedCourseFeeList.filter(courseFee => courseFee.duration === value)[0]);
                }}
                renderTrigger={[selectedCourse]}
              />
            </Stack>
          )}
        </Stack>
        <FeesDetailBox />
      </Stack>
      <Stack gap={0.5}>
        {selectedCourseFee?.offer && (
          <Stack bgcolor="secondary.100" borderRadius={2.5} p={2}>
            <Typography variant="bodyBold" color={"primary.900"}>
              Tuition Fees:
            </Typography>
            <Typography variant="bodyBold" color={"primary.900"}>
              {selectedCourseFee?.offer}
            </Typography>
          </Stack>
        )}
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

export { DiscoverPanel };
export default connector(DiscoverPanel);
