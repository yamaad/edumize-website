import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "redux/store";
import { UniversityProfile } from "features/universityProfile/UniversityProfile.feature.tsx";
import { ProgramProfile } from "features/programProfile/ProgramProfile.feature.tsx";
import { edumizeTheme } from "theme/theme.ts";
import { ThemeProvider } from "@mui/material/styles";

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

      ReactDOM.createRoot(elementId).render(
        <Provider store={store}>
          <ThemeProvider theme={edumizeTheme}>{component(props)}</ThemeProvider>
        </Provider>
      );
    }
  } catch (error) {
    console.error("REACTJS-VITE", error);
  }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={edumizeTheme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
