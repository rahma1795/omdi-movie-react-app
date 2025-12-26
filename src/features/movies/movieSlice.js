import { createSlice } from "@reduxjs/toolkit";
import { fetchMovies, fetchMovieById } from "./movieThunks";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    list: [],
    selected: null,
    loading: false,
    page: 1,
    totalResults: 0,
    search: ""
  },
  reducers: {
    resetMovies(state) {
      state.list = [];
      state.page = 1;
    },
    setSearch(state, action) {
      state.search = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.Search) {
          state.list.push(...action.payload.Search);
          state.totalResults = action.payload.totalResults;
          state.page += 1;
        }
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.selected = action.payload;
      });
  }
});

export const { resetMovies, setSearch } = movieSlice.actions;
export default movieSlice.reducer;
