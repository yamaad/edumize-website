import { courseApi } from "./services/airtable/course/courseApi";
import { filterApi } from "./services/airtable/dynamicFilters/filterApi";
import { universityApi } from "./services/airtable/university/universityApi";
import { universityTypeApi } from "./services/airtable/universityType/universityType";
import { currencyApi } from "./services/edumizeApi/currency/currency";
import currencyReducer from "./features/currencySlice";
import { languageInstituteCourseApi } from "./services/airtable/languageInstituteCourse/languageInstituteCourseApi";
import InstituteReducer from "./features/instituteSlice/instituteCourseSlice";

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
};
