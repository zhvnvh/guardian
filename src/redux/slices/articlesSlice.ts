import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import Guardian from "guardian-js";

const guardian = new Guardian("cbdcff88-5d0a-4a49-b913-5db230bbcd23", false);

export const articleLoader = async ({ params }: any) => {
  const { id }: any = params;
  const decodedId = atob(id ? id : "cool");

  const options: { [k: string]: any } = {
    ids: decodedId,
    showBlocks: ["all"],
    showElements: ["all"],
    showFields: [
      "trailText",
      "headline",
      "body",
      "standfirst",
      "thumbnail",
      "byline",
      "internalPageCode",
    ],
  };
  const res = await guardian.content.search("", options);
  console.log("res", res);

  return res.results[0];
  // return null;
};

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticlesStatus",
  async (params: any, thunkAPI) => {
    const { searchValue, orderValue, itemsValue, fromDateValue, toDateValue } =
      params;

    const options: { [k: string]: any } = {
      showFields: "thumbnail",
      orderBy: orderValue,
      pageSize: itemsValue,
    };
    if (fromDateValue) {
      options.fromDate = new Date(fromDateValue).toISOString().slice(0, 10);
    }
    if (toDateValue) {
      options.toDate = new Date(toDateValue).toISOString().slice(0, 10);
    }

    const res = await guardian.content.search(searchValue, options);

    return res;
  }
);

export const paginationArticles = createAsyncThunk(
  "articles/paginationArticlesStatus",
  async (params: any, thunkAPI) => {
    const {
      searchValue,
      orderValue,
      itemsValue,
      fromDateValue,
      toDateValue,
      pageValue,
    } = params;

    const options: { [k: string]: any } = {
      showFields: "thumbnail",
      orderBy: orderValue,
      pageSize: itemsValue,
      page: pageValue,
    };
    if (fromDateValue) {
      options.fromDate = new Date(fromDateValue).toISOString().slice(0, 10);
    }
    if (toDateValue) {
      options.toDate = new Date(toDateValue).toISOString().slice(0, 10);
    }
    const res = await guardian.content.search(searchValue, options);
    return res;
  }
);

interface ArticlesState {
  results: any;
  article: any;
  page: number;
}

const initialState: ArticlesState = {
  results: [],
  article: {},
  page: 2,
};

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<any>) => {
      state.results = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      // Add user to the state array
      state.results = action.payload.results;
    });
    builder.addCase(paginationArticles.fulfilled, (state, action) => {
      // Add user to the state array
      state.page++;
      state.results.push(...action.payload.results);
    });
  },
});

// Action creators are generated for each case reducer function
export const { set } = articlesSlice.actions;

export default articlesSlice.reducer;
