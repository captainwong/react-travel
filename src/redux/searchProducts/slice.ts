import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface SearchProductState {
  loading: boolean;
  error: string | null;
  data: any;
  pagination: any;
}

const initialState: SearchProductState = {
  loading: true,
  error: null,
  data: null,
  pagination: null,
};

export const searchProducts = createAsyncThunk(
  "searchProducts/searchProducts",
  async (params: {
    keywords: string | undefined,
    nextPage: string | number,
    pageSize: string | number,
  }, thunkAPI) => {
    //let url = `http://123.56.149.216:8080/api/touristRoutes?pageNumber=${params.nextPage}&pageSize=${params.pageSize}`;
    let url = `http://127.0.0.1:3001/api/touristRoutes?pageNumber=${params.nextPage}&pageSize=${params.pageSize}`;
    if (params.keywords) {
      url += `&keyword=${params.keywords}`;
    }
    const res = await axios.get(url);
    console.log(res.data);
    console.log(res.headers['x-pagination']);
    return {
      data: res.data,
      pagination: JSON.parse(res.headers['x-pagination'])
    };
  }
)

export const searchProductsSlice = createSlice({
  name: 'searchProducts',
  initialState: initialState,
  reducers: {

  },
  extraReducers: {
    [searchProducts.pending.type]: (state) => {
      state.loading = true;
    },
    [searchProducts.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.data = action.payload.data;
      state.pagination = action.payload.pagination;
      state.error = null;
      state.loading = false;
    },
    [searchProducts.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});
