import { Box, Card, CardActionArea, CardContent, Skeleton, Stack, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ConnectedProps, connect } from "react-redux";
import { InstituteCourseFeeModel, InstituteCourseModel, InstituteModel } from "redux/institute/institute.model";
import { setSelectedCourse } from "redux/institute/institute.slice";
import { RootState } from "redux/store";

// map state to props
const mapStateToProps = (state: RootState) => ({
  currentInstitute: state.institute.currentInstitute,
  courseList: state.institute.courseList,
  selectedCourse: state.institute.selectedCourse,
  courseFeeList: state.institute.courseFeeList,
});

// map dispatch to props
const mapDispatchToProps = {
  setSelectedCourse,
};

// connect to redux
const connector = connect(mapStateToProps, mapDispatchToProps);

// define props
type PropsFromRedux = ConnectedProps<typeof connector>;

//--------------
// interfaces
//--------------
interface PropsWithConnector extends PropsFromRedux {}
interface PropsWithoutConnector {
  currentInstitute: InstituteModel | undefined;
  courseList: InstituteCourseModel[];
  selectedCourse: InstituteCourseModel | undefined;
  courseFeeList: InstituteCourseFeeModel[];
  setSelectedCourse: Dispatch<SetStateAction<InstituteCourseModel | undefined>>;
}
type InstitutesCoursesCardProps = PropsWithConnector | PropsWithoutConnector;
//---------------
// component
//---------------
const InstituteCourseCard = ({ currentInstitute, courseList, selectedCourse, setSelectedCourse, courseFeeList }: InstitutesCoursesCardProps) => {
  //-------------
  // local state
  //-------------
  const [filteredCourseList, setFilteredCourseList] = useState<InstituteCourseModel[]>([]);
  //-------------
  // handlers
  //-------------
  const handleOnCourseSelect = (course: InstituteCourseModel) => {
    setSelectedCourse(course);
  };
  //-------------
  // triggers
  //-------------
  useEffect(() => {
    if (courseFeeList.length > 0 && courseList.length > 0 && currentInstitute) {
      const getSet = new Set(courseFeeList.filter(value => value.instituteId === currentInstitute.id).map(value => value.courseId));
      const availableCourses = courseList.filter(value => [...getSet].includes(value.id));
      setFilteredCourseList(availableCourses);
      if (availableCourses.length > 0) setSelectedCourse(availableCourses[0]);
    }
  }, [courseList, courseFeeList, currentInstitute]);

  return (
    <Box>
      {filteredCourseList.length ? (
        <Stack direction={"row"} flexWrap={"wrap"} gap={2}>
          {filteredCourseList.map((course, index) => (
            <Card
              key={index}
              elevation={1}
              sx={{
                backgroundColor: selectedCourse && selectedCourse.id === course.id ? "secondary.100" : "primary.100",
                borderRadius: 2,
                width: "fit-content",
                height: "fit-content",
              }}
            >
              <CardActionArea sx={{ px: 2, py: 3 }} onClick={() => handleOnCourseSelect(course)}>
                <CardContent sx={{ px: 0, py: 0, width: "fit-content" }}>
                  <Typography variant="h6" color={"primary"}>
                    {course.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      ) : (
        <Skeleton height={70} width={120} animation="wave" variant="rounded" />
      )}
    </Box>
  );
};
export { InstituteCourseCard };
export default connector(InstituteCourseCard);
