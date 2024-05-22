import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ComponentRoute, PageRoute } from "./Routes/constant";

function App() {
  return (
    <Routes>
      <Route path={PageRoute.university}>
        <Route index element={<></>} />
        <Route path={ComponentRoute.universityCourses} element={<></>} />
      </Route>
      <Route path={PageRoute.program}>
        <Route path={ComponentRoute.programCourses} />
      </Route>
      <Route path="*" element={<>404 Page not found</>} />
    </Routes>
  );
}

export default App;
