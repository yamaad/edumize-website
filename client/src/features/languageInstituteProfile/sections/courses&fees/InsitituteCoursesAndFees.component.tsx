import { Skeleton, Stack, Typography } from "@mui/material";
import FeesDetailBox from "./components/FeesDetailBox.component";
import { RootState } from "redux/store";
import { ConnectedProps, connect } from "react-redux";
import InstituteCourseCard from "./components/InstituteCourseCard.component";

import { SliderSelect } from "components/sliderSelect.component.tsx/SliderSelect.component";
import { useEffect, useState } from "react";
import { InstituteCourseFeeModel } from "redux/institute/institute.model";
import { setSelectedCourseFee } from "redux/institute/institute.slice";
import { useGetLanguageInstituteCourseFeeListQuery, useGetLanguageInstituteCourseListQuery } from "redux/institute/institute.api";

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
const InstitutesCoursesAndFees = ({
  currentInstitute,
  courseFeeList,
  selectedCourse,
  setSelectedCourseFee,
  selectedCourseFee,
}: InstitutesCoursesAndFees) => {
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
    <Stack borderRadius={2} p={1} gap={2} maxWidth={"100%"}>
      <Stack direction={"row"} gap={4} justifyContent="space-between">
        <Stack flexGrow={1} gap={6}>
          {
            <Typography variant="h5" color="primary.900">
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
              <SliderSelect
                valueRange={selectedCourseFeeList?.map(course => course.duration)}
                onIndexChange={index => {
                  setSelectedCourseFee(selectedCourseFeeList[index]);
                }}
                renderTrigger={selectedCourse}
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

export { InstitutesCoursesAndFees };
export default connector(InstitutesCoursesAndFees);
