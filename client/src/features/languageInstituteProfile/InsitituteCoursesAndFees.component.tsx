import { Skeleton, Stack, Typography } from "@mui/material";
import FeesDetailBox from "./FeesDetailBox.component";
import { RootState } from "redux/store";
import { ConnectedProps, connect } from "react-redux";
import InstituteCourseCard from "./InstituteCourseCard.component";
import {
  useGetLanguageInstituteCourseFeeListQuery,
  useGetLanguageInstituteCourseListQuery,
} from "redux/services/airtable/languageInstituteCourse/languageInstituteCourseApi";
import { SliderSelect } from "components/sliderSelect.component.tsx/SliderSelect.component";
import { useEffect, useState } from "react";
import { InstituteCourseFeeModel } from "redux/features/instituteSlice/instituteModel";
import { setSelectedCourseFee } from "redux/features/instituteSlice/instituteCourseSlice";

// map state to props
const mapStateToProps = (state: RootState) => ({
  currentInstitute: state.institute.currentInstitute,
  courseFeeList: state.institute.courseFeeList,
  selectedCourse: state.institute.selectedCourse,
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
const InstitutesCoursesAndFees = ({ currentInstitute, courseFeeList, selectedCourse, setSelectedCourseFee }: InstitutesCoursesAndFees) => {
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
  //-------------
  // handlers
  //-------------

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
          <Stack gap={2}>
            <Typography variant="h4" color="content.500">
              Months
            </Typography>
            {selectedCourseFeeList && (
              <SliderSelect
                valueRange={selectedCourseFeeList?.map(course => course.duration)}
                onIndexChange={index => {
                  setSelectedCourseFee(selectedCourseFeeList[index]);
                }}
              />
            )}
          </Stack>
        </Stack>
        <FeesDetailBox />
      </Stack>
      <Stack gap={0.5}>
        <Stack bgcolor="secondary.100" borderRadius={2.5} p={2}>
          <Typography variant="bodyBold" color={"primary.900"}>
            Tuition Fees:
          </Typography>
          <Typography variant="bodyLight" color={"primary.900"}>
            [[Apply for 6-Months and Get 1 extra month Tuition waiver, Free IELTS test fee, ..etc]]
          </Typography>
        </Stack>
        <Typography
          variant="bodyLight"
          color="primary.main"
          component="a"
          href=""
          sx={{ alignSelf: "start", fontWeight: 300, textDecoration: "none" }}
        >
          Terms & Conditions
        </Typography>
      </Stack>
    </Stack>
  );
};

export { InstitutesCoursesAndFees };
export default connector(InstitutesCoursesAndFees);