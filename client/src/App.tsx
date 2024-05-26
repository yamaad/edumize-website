import { ComponentRoute, PageRoute } from "./routes/constant.ts";
import { ProgramProfile } from "./Features/Program/ProgramProfile.feature.tsx";
import { UniversityProfile } from "./Features/UniversityProfile/UniversityProfile.feature.tsx";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>HOME PAGE 1</h1>} />
      <Route path={PageRoute.university}>
        <Route path={ComponentRoute.universityCourses} element={<UniversityProfile universityId={213} />} />
      </Route>
      <Route path={PageRoute.program}>
        <Route path={ComponentRoute.programCourses} element={<ProgramProfile programId={"E05APP0XXX"} />} />
      </Route>
      <Route path="*" element={<>404 Page not found</>} />
    </Routes>
  );
}

export default App;
