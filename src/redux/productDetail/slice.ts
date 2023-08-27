import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

export const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState: initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
      state.error = null;
      state.loading = false;  
    },
    fetchFail: (state, action: PayloadAction<string|null>) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});
