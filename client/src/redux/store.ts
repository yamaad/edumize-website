import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers";
import { setupListeners } from "@reduxjs/toolkit/query";
import logger from "redux-logger";
import { courseApi } from "./course/course.api";
import { currencyApi } from "./currency/currency.api";
import { languageInstituteCourseApi } from "./institute/institute.api";
import { filterApi } from "./dynamicFilters/filterApi";
import { universityApi } from "./university/universityApi";
import { universityTypeApi } from "./university/universityType/universityType";
import { leadApi } from "./lead/lead.api";

const middlewares = [
  courseApi.middleware,
  filterApi.middleware,
  universityApi.middleware,
  universityTypeApi.middleware,
  currencyApi.middleware,
  languageInstituteCourseApi.middleware,
  leadApi.middleware,
];
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}
export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middlewares),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
