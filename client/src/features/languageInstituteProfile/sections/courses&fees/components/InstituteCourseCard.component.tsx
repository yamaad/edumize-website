import { Card, CardActionArea, CardContent, Skeleton, Stack, Typography } from "@mui/material";
import { ConnectedProps, connect } from "react-redux";
import { setSelectedCourse } from "redux/features/instituteSlice/instituteCourseSlice";
import { InstituteCourseModel } from "redux/features/instituteSlice/instituteModel";
import { RootState } from "redux/store";

// map state to props
const mapStateToProps = (state: RootState) => ({
  courseList: state.institute.courseList,
  selectedCourse: state.institute.selectedCourse,
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
interface InstitutesCoursesCardProps extends PropsFromRedux {}
//---------------
// component
//---------------
const InstituteCourseCard = ({ courseList, selectedCourse, setSelectedCourse }: InstitutesCoursesCardProps) => {
  //-------------
  // handlers
  //-------------
  const handleOnCourseSelect = (course: InstituteCourseModel) => {
    setSelectedCourse(course);
  };

  return (
    <div>
      {courseList.length ? (
        <Stack direction={"row"} flexWrap={"wrap"} gap={2}>
          {courseList.map((course, index) => (
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
    </div>
  );
};
export { InstituteCourseCard };
export default connector(InstituteCourseCard);
