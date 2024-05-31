import { PageRoute } from "./routes/constant.ts";
import { ProgramProfile } from "./features/programProfile/ProgramProfile.feature.tsx";
import { UniversityProfile } from "./features/universityProfile/UniversityProfile.feature.tsx";
import { Route, Routes } from "react-router-dom";
import { LanguageInstitute } from "features/languageInstituteProfile/LanguageInstituteProfile.feature.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>HOME PAGE 1</h1>} />
      <Route path={PageRoute.university} element={<UniversityProfile universityId={213} />} />
      <Route path={PageRoute.program} element={<ProgramProfile programId={"E05APP0XXX"} />} />
      <Route path={PageRoute.languageInstitute} element={<LanguageInstitute />} />
      <Route path="*" element={<>404 Page not found</>} />
    </Routes>
  );
}

export default App;
