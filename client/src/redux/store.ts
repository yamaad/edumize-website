import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers";
import { setupListeners } from "@reduxjs/toolkit/query";
import { courseApi } from "./services/airtable/course/courseApi";
import { filterApi } from "./services/airtable/dynamicFilters/filterApi";
import { universityApi } from "./services/airtable/university/universityApi";
import { universityTypeApi } from "./services/airtable/universityType/universityType";
import { currencyApi } from "./services/edumizeApi/currency/currency";

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(courseApi.middleware)
      .concat(filterApi.middleware)
      .concat(universityApi.middleware)
      .concat(universityTypeApi.middleware)
      .concat(currencyApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
