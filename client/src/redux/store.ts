import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers";
import { setupListeners } from "@reduxjs/toolkit/query";
import logger from "redux-logger";
import { courseApi } from "./services/airtable/course/courseApi";
import { filterApi } from "./services/airtable/dynamicFilters/filterApi";
import { universityApi } from "./services/airtable/university/universityApi";
import { universityTypeApi } from "./services/airtable/universityType/universityType";
import { currencyApi } from "./services/edumizeApi/currency/currency";
import { languageInstituteCourseApi } from "./services/airtable/languageInstituteCourse/languageInstituteCourseApi";

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([
      logger,
      courseApi.middleware,
      filterApi.middleware,
      universityApi.middleware,
      universityTypeApi.middleware,
      currencyApi.middleware,
      languageInstituteCourseApi.middleware,
    ]),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
