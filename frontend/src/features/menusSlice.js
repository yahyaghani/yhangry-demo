import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_BASE_URL from "../config";

// Fetch Menus
export const fetchMenus = createAsyncThunk(
  "menus/fetchMenus",
  async ({ page, cuisineSlug }, { getState, rejectWithValue }) => {
    const { guests } = getState().menus;
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/set-menus?page=${page}&per_page=6&cuisineSlug=${cuisineSlug}`
      );
      if (!response.ok) throw new Error("Failed to fetch menus");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCuisines = createAsyncThunk(
  "menus/fetchCuisines",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cuisines`);
      if (!response.ok) throw new Error("Failed to fetch cuisines");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const menusSlice = createSlice({
  name: "menus",
  initialState: {
    menus: [],
    cuisines: [],
    selectedCuisine: "",
    guests: 10,
    page: 1,
    totalMenus: 0,
    loading: false,
    error: null,
  },
  reducers: {
    setGuests(state, action) {
      state.guests = action.payload;
    },
    setSelectedCuisine(state, action) {
      state.selectedCuisine = action.payload;
      state.page = 1;
      state.menus = [];
    },
    incrementPage(state) {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenus.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMenus.fulfilled, (state, action) => {
        const { menus, total } = action.payload;

        // Prevent duplicates
        const newMenus = menus.filter(
          (menu) => !state.menus.some((existing) => existing.id === menu.id)
        );

        // Append new menus at the top
        state.menus = state.page === 1
          ? menus
          : [...newMenus, ...state.menus];

        state.totalMenus = total;
        state.loading = false;
      })
      .addCase(fetchMenus.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchCuisines.fulfilled, (state, action) => {
        state.cuisines = action.payload.cuisines;
      })
      .addCase(fetchCuisines.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setGuests, setSelectedCuisine, incrementPage } = menusSlice.actions;
export default menusSlice.reducer;
