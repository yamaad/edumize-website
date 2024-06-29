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
import LanguageInstitute from "features/languageInstituteProfile/LanguageInstituteProfile.feature.tsx";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";
import { LangContactProvider } from "context/langContext.tsx";

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
  {
    id: "language-institute-courses-and-fees",
    component: (props: any) => <LanguageInstitute instituteId={Number(props.instituteId)} />,
    parameters: [
      {
        prop: "instituteId",
        attribute: "language-institute-id",
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
      const lang = elementId.getAttribute("lang");
      ReactDOM.createRoot(elementId).render(
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <ThemeProvider theme={edumizeTheme}>
              <LangContactProvider lang={lang || "en"}>{component(props)}</LangContactProvider>
            </ThemeProvider>
          </Provider>
        </I18nextProvider>
      );
    }
  } catch (error) {
    console.error("REACTJS-VITE", error);
  }
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <ThemeProvider theme={edumizeTheme}>
          <BrowserRouter>
            <LangContactProvider lang="ar">
              <App />
            </LangContactProvider>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </I18nextProvider>
  </React.StrictMode>
);
