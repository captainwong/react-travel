import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_HOST } from '../api';
import { checkout } from '../shoppingCart/slice';

interface OrderState {
  loading: boolean;
  error: string | null;
  order: any;
}

const initialState: OrderState = {
  loading: false,
  error: null,
  order: null,
};

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (params: { jwt: string, orderId: string }, thunkAPI) => {
      const { data } = await axios.post(`${API_HOST}/orders/${params.orderId}/placeOrder`, null, {
        headers: {
          'Authorization': 'Bearer ' + params.jwt
        }
      });
      return data;
  }
)

export const orderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: {
    [checkout.pending.type]: (state) => {
      state.loading = true;
      state.error = null;
      state.order = null;
    },
    [checkout.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.order = action.payload;
      state.error = null;
      state.loading = false;  
    },
    [checkout.rejected.type]: (state, action: any) => {
      state.error = action.payload || action.error.message;
      state.loading = false;
    },

    [placeOrder.pending.type]: (state) => {
      state.loading = true;
      state.error = null;
      state.order = null;
    },
    [placeOrder.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.order = action.payload;
      state.error = null;
      state.loading = false;  
    },
    [placeOrder.rejected.type]: (state, action: any) => {
      state.error = action.payload || action.error.message;
      state.loading = false;
    }
  }
});
