import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("token");

// Async thunk to fetch items from API
export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  const response = await axios.get("http://localhost:3000/api/items", {
    headers: {
      Authorization: `Bearer ${token}`, // Send token in Authorization header
    },
  });
  return response.data;
});


const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push({
        ...action.payload,
        id: state.items.length + 1,
        created_at: new Date().toISOString(),
      });
    },
    editItem: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload.updatedData,
        };
      }
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        console.log(state)
        state.status = "succeeded";
        state.items = action.payload; // Populate items with API data
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addItem, editItem, deleteItem } = itemsSlice.actions;
export default itemsSlice.reducer;
