import { ComponentRoute, PageRoute } from "./routes/constant";
import { ProgramProfile } from "features/Program/ProgramProfile.feature";
import { Route, Routes } from "react-router-dom";
import { UniversityProfile } from "./features/UniversityProfile/UniversityProfile.feature";

// import ReactDOM from "react-dom/client";
// import { Provider } from "react-redux";
// import { store } from "./redux/store.ts";

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
