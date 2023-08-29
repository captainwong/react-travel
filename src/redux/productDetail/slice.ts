import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_HOST } from '../api';

interface ProductDetailState{
  loading: boolean;
  error: string | null;
  data: any;
}

const initialState: ProductDetailState = {
  loading: true,
  error: null,
  data: null,
};

export const getProductDetail = createAsyncThunk(
  "productDetail/getProductDetail",
  async (touristRouteId: string, thunkAPI) => {
    const { data } = await axios.get(`${API_HOST}/api/touristRoutes/${touristRouteId}`);
    return data;
  }
)

export const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState: initialState,
  reducers: {
    
  },
  extraReducers: {
    [getProductDetail.pending.type]: (state) => {
      state.loading = true;
    },
    [getProductDetail.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
      state.error = null;
      state.loading = false;  
    },
    [getProductDetail.rejected.type]: (state, action: PayloadAction<string|null>) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});
