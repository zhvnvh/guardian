import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FilterState {
  items: number;
  order: string;
  search: string;
  fromDate: number | undefined;
  toDate: number | undefined;
}

const initialState: FilterState = {
  items: 10,
  order: "relevance",
  search: "",
  fromDate: undefined,
  toDate: undefined,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    items: (state, action: PayloadAction<number>) => {
      state.items = action.payload;
    },
    order: (state, action: PayloadAction<string>) => {
      state.order = action.payload;
    },
    search: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    fromDate: (state, action: PayloadAction<number | undefined>) => {
      state.fromDate = action.payload;
    },
    toDate: (state, action: PayloadAction<number | undefined>) => {
      state.toDate = action.payload;
    },
    // getfromDate: (state) => {
    //   var date = state.fromDate === undefined ? null : new Date(state.fromDate);
    //   return date;
    // },
    // gettoDate: (state) => {

    // },
  },
});

// Action creators are generated for each case reducer function
export const { items, order, search, fromDate, toDate } = filterSlice.actions;

export default filterSlice.reducer;
