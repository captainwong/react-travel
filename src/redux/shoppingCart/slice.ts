import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_HOST } from '../api';

interface ShoppingCartState {
  loading: boolean;
  error: string | null;
  items: any[];
}

const initialState: ShoppingCartState = {
  loading: false,
  error: null,
  items: [],
};

export const getShoppingCart = createAsyncThunk(
  "shoppingCart/getShoppingCart",
  async (token: string, thunkAPI) => {
    const { data } = await axios.get(`${API_HOST}/api/shoppingCart`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
    return data.shoppingCartItems;
  }
)

export const addShoppingCartItem = createAsyncThunk(
  "shoppingCart/addShoppingCartItem",
  async (params: { token: string, touristRouteId: string }, thunkAPI) => {
    const { data } = await axios.post(`${API_HOST}/api/shoppingCart/items`, {
      touristRouteId: params.touristRouteId,
    }, {
      headers: {
        'Authorization': 'Bearer ' + params.token
      }
    });
    return data.shoppingCartItems;
  }
)

export const clearShoppingCart = createAsyncThunk(
  "shoppingCart/clearShoppingCart",
  async (token: string, thunkAPI) => {
    return await axios.delete(`${API_HOST}/api/shoppingCart/items`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
  }
)

export const removeShoppingCartItems = createAsyncThunk(
  "shoppingCart/removeShoppingCartItems",
  async (params: { token: string, ids: number[] }, thunkAPI) => {
    return await axios.delete(`${API_HOST}/api/shoppingCart/items/(${params.ids.join(',')})`, {
      headers: {
        'Authorization': 'Bearer ' + params.token
      }
    });
  }
)

export const checkOut = createAsyncThunk(
  "shoppingCart/checkOut",
  async (token: string, thunkAPI) => {
    const { data } = await axios.post(`${API_HOST}/api/shoppingCart/checkout`, null, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
    return data;
  }
)

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState: initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: {
    [getShoppingCart.pending.type]: (state) => {
      state.loading = true;
      state.error = null;
      state.items = [];
    },
    [getShoppingCart.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.items = action.payload;
      state.error = null;
      state.loading = false;
    },
    [getShoppingCart.rejected.type]: (state, action: any) => {
      state.error = action.payload || action.error.message;
      state.loading = false;
    },

    [addShoppingCartItem.pending.type]: (state) => {
      state.loading = true;
      state.error = null;
      state.items = [];
    },
    [addShoppingCartItem.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.items = action.payload;
      state.error = null;
      state.loading = false;
    },
    [addShoppingCartItem.rejected.type]: (state, action: any) => {
      state.error = action.payload || action.error.message;
      state.loading = false;
    },

    [clearShoppingCart.pending.type]: (state) => {
      state.loading = true;
      state.error = null;
      state.items = [];
    },
    [clearShoppingCart.fulfilled.type]: (state) => {
      state.items = [];
      state.error = null;
      state.loading = false;
    },
    [clearShoppingCart.rejected.type]: (state, action: any) => {
      state.error = action.payload || action.error.message;
      state.loading = false;
    },

    [removeShoppingCartItems.pending.type]: (state) => {
      state.loading = true;
      state.error = null;
      state.items = [];
    },
    [removeShoppingCartItems.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.items = [];
      state.error = null;
      state.loading = false;
    },
    [removeShoppingCartItems.rejected.type]: (state, action: any) => {
      state.error = action.payload || action.error.message;
      state.loading = false;
    },

    [checkOut.pending.type]: (state) => {
      state.loading = true;
      state.error = null;
      state.items = [];
    },
    [checkOut.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.items = [];
      state.error = null;
      state.loading = false;
    },
    [checkOut.rejected.type]: (state, action: any) => {
      state.error = action.payload || action.error.message;
      state.loading = false;
    },
  }
});
