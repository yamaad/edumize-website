import { Stack } from "@mui/material";
import { LanguageInstituteCourseCard } from "./CourseCard.component";

//--------------
// interfaces
//--------------
interface ILanguageInstitute {
  instituteId: number;
}
//---------------
// component
//---------------
const LanguageInstitute = ({ instituteId }: ILanguageInstitute) => {
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
      <LanguageInstituteCourseCard instituteId={instituteId} />
    </Stack>
  );
};

export { LanguageInstitute };
