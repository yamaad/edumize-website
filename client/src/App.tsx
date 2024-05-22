import { Route, Routes } from "react-router-dom";
import { ComponentRoute, PageRoute } from "./Routes/constant";
import Courses from "./Features/University/Courses.component";

function App() {
  return (
    <Routes>
      <Route path={PageRoute.university}>
        <Route path={ComponentRoute.universityCourses} element={<Courses />} />
      </Route>
      <Route path={PageRoute.program}>
        <Route path={ComponentRoute.programCourses} />
      </Route>
      <Route path="*" element={<>404 Page not found</>} />
    </Routes>
  );
}

export default App;
