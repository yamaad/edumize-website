import { Stack } from "@mui/material";
import { ConnectedProps, connect } from "react-redux";
import { useGetLanguageInstituteQuery } from "redux/services/airtable/languageInstituteCourse/languageInstituteCourseApi";
import { useEffect } from "react";
import { RootState } from "redux/store";
import InstitutesCoursesAndFees from "./sections/courses&fees/InsitituteCoursesAndFees.component";
import { setCurrentInstitute } from "redux/features/instituteSlice/instituteCourseSlice";

// map state to props
const mapStateToProps = (state: RootState) => ({
  instituteList: state.institute.instituteList,
});

// map dispatch to props
const mapDispatchToProps = {
  setCurrentInstitute,
};

// connect to redux
const connector = connect(mapStateToProps, mapDispatchToProps);

// define props
type PropsFromRedux = ConnectedProps<typeof connector>;
//--------------
// interfaces
//--------------
interface ILanguageInstitute extends PropsFromRedux {
  instituteId: number;
}
//---------------
// component
//---------------
const LanguageInstitute = ({ instituteId, instituteList, setCurrentInstitute }: ILanguageInstitute) => {
  //-------------
  // hooks
  //-------------
  useGetLanguageInstituteQuery();
  //-------------
  // triggers
  //-------------
  useEffect(() => {
    setCurrentInstitute(instituteId);
  }, [instituteList]);

  return (
    <Stack>
      <InstitutesCoursesAndFees />
    </Stack>
  );
};

export { LanguageInstitute };
export default connector(LanguageInstitute);
