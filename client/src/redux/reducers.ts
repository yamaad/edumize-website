import { courseApi } from "./course/course.api";
import { currencyApi } from "./currency/currency.api";
import currencyReducer from "./currency/currency.slice";
import { filterApi } from "./dynamicFilters/filterApi";
import { languageInstituteCourseApi } from "./institute/institute.api";
import InstituteReducer from "./institute/institute.slice";
import { leadApi } from "./lead/lead.api";
import { universityApi } from "./university/universityApi";
import { universityTypeApi } from "./university/universityType/universityType";

export default {
  // slice
  currency: currencyReducer,
  institute: InstituteReducer,

  // api
  [courseApi.reducerPath]: courseApi.reducer,
  [universityApi.reducerPath]: universityApi.reducer,
  [universityTypeApi.reducerPath]: universityTypeApi.reducer,
  [filterApi.reducerPath]: filterApi.reducer,
  [currencyApi.reducerPath]: currencyApi.reducer,
  [languageInstituteCourseApi.reducerPath]: languageInstituteCourseApi.reducer,
  [leadApi.reducerPath]: leadApi.reducer,
};
