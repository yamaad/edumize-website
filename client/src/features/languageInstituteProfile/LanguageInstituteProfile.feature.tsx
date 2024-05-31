import { Stack } from "@mui/material";
import { LanguageInstituteCourseCard } from "./CourseCard.component";

//--------------
// interfaces
//--------------
interface ILanguageInstitute {}
//---------------
// component
//---------------
const LanguageInstitute = ({}: ILanguageInstitute) => {
  //-------------
  // local states
  //-------------

  //-------------
  // hooks
  //-------------

  //-------------
  // constants
  //-------------

  //-------------
  // triggers
  //-------------

  //-------------
  // handlers
  //-------------

  return (
    <Stack>
      <LanguageInstituteCourseCard />
    </Stack>
  );
};

export { LanguageInstitute };
