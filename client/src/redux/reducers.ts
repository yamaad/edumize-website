import { courseApi } from "./services/airtable/course/courseApi";
import { filterApi } from "./services/airtable/dynamicFilters/filterApi";
import { universityApi } from "./services/airtable/university/universityApi";
import { universityTypeApi } from "./services/airtable/universityType/universityType";
import { currencyApi } from "./services/edumizeApi/currency/currency";
import currencyReducer from "./features/currencySlice";

export default {
  [courseApi.reducerPath]: courseApi.reducer,
  [universityApi.reducerPath]: universityApi.reducer,
  [universityTypeApi.reducerPath]: universityTypeApi.reducer,
  [filterApi.reducerPath]: filterApi.reducer,
  [currencyApi.reducerPath]: currencyApi.reducer,
  currency: currencyReducer,
};
