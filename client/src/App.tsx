import { Route, Routes } from "react-router-dom";
import { ComponentRoute, PageRoute } from "./routes/constant";
import ReactDOM from "react-dom/client";
import { UniversityProfile } from "./features/UniversityProfile/UniversityProfile.feature";
import { ProgramProfile } from "./features/Program/ProgramProfile.feature";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>HOME PAGE</h1>} />
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
// For WebFlow Embedding
const webFlowEmbedders = [
  {
    elementId: document.getElementById("uni-courses"),
    component: (props: any) => <UniversityProfile universityId={Number(props.universityId)} />,
  },
];
webFlowEmbedders.map(obj => {
  const { elementId, component } = obj;
  if (elementId) {
    try {
      const universityId = elementId.getAttribute("universityId");
      ReactDOM.createRoot(elementId).render(<>{component({ universityId })}</>);
    } catch (error) {
      console.error(error);
    }
  }
});

export default App;
