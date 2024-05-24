import { airTableApi } from "../services/airTable/airTable";

export default {
  [airTableApi.reducerPath]: airTableApi.reducer,
};
