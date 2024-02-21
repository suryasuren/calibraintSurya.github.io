import createRequest from "../../utils/interceptors";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProductData = createAsyncThunk(
  "product/getAllProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await createRequest.get(`/products`);
      const processedData = processProductData(response.data);
      return processedData;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

const processProductData = (responseData) => {
  const processedItems = responseData.map((item) => ({
    ...item,
    images: item.images.map((image) => image.replace(/[\[\]\"]/g, "")),
  }));

  const categoryArray = processedItems.map((item) => ({
    id: item.category.id,
    name: item.category.name,
  }));

  const uniqueArray = categoryArray.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.id === item.id && t.name === item.name)
  );

  return {
    category: uniqueArray,
    data: processedItems,
  };
};

export default fetchProductData;
