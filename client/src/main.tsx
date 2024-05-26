import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "redux/store";
import { ProgramProfile } from "feature/programs/ProgramProfile.feature.tsx";
import { UniversityProfile } from "feature/universityProfiles/UniversityProfile.feature.tsx";


// For WebFlow Embedding
const webFlowEmbedders = [
  {
    id: "uni-courses",
    component: (props: any) => <UniversityProfile universityId={Number(props.universityId)} />,
    parameters: [
      {
        prop: "universityId",
        attribute: "university-id",
      },
    ],
  },
  {
    id: "uni-offering-course-content",
    component: (props: any) => <ProgramProfile programId={props.programId} />,
    parameters: [
      {
        prop: "programId",
        attribute: "program-id",
      },
    ],
  },
];

webFlowEmbedders.map(obj => {
  const { id, component, parameters } = obj;
  try {
    const elementId = document.getElementById(id);
    if (elementId) {
      const props = parameters.reduce((acc: any, param) => {
        acc[param.prop] = elementId.getAttribute(param.attribute);
        return acc;
      }, {});

      ReactDOM.createRoot(elementId).render(<Provider store={store}>{component(props)}</Provider>);
    }
  } catch (error) {
    console.error("REACTJS-VITE", error);
  }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
