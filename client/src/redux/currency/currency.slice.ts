import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface SelectedCurrency {
  currency: string;
  rate: number;
}

// Define the initial state using that type
const initialState: SelectedCurrency = {
  currency: "MYR",
  rate: 1,
};

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setSelectedCurrency: (state, action: PayloadAction<SelectedCurrency>) => {
      state.currency= action.payload.currency;
      state.rate= action.payload.rate;
    },
  },
});

export const { setSelectedCurrency } = currencySlice.actions;


export default currencySlice.reducer;
