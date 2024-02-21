import { createSlice } from "@reduxjs/toolkit";
import fetchProductData from "../actions/productMiddleware";

const productReducer = createSlice({
  name: "ProductReducer",
  initialState: {
    isLoading: false,
    data: {},
    error: "",
  },
  reducers: {},
  extraReducers: (caseCondition) => {
    caseCondition.addCase(fetchProductData.pending, (state) => {
      state.isLoading = true;
    });
    caseCondition.addCase(fetchProductData.fulfilled, (state, actions) => {
      state.data = actions.payload;
      state.isLoading = false;
    });
    caseCondition.addCase(fetchProductData.rejected, (state, actions) => {
      state.isLoading = false;
      if (typeof actions.payload === "string") {
        state.error = actions.payload;
      }
    });
  },
});

const productIndividualReducer = createSlice({
  name: "ProductReducer",
  initialState: {
    isLoading: false,
    dataVal: null,
    error: "",
  },
  reducers: {
    productView: (state, action) => {
      state.dataVal = action.payload;
    },
    productRemove: (state) => {
      state.dataVal = null;
    },
  },
});

export const { productView, productRemove } = productIndividualReducer.actions;
export const productReducerVal = productIndividualReducer.reducer;

export default productReducer.reducer;
