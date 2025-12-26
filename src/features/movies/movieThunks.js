import { createAsyncThunk } from "@reduxjs/toolkit";
import { omdbApi } from "../../service/omdbApi";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ search, page }) => {
    const res = await omdbApi.get("", {
      params: { s: search, page }
    });
    return res.data;
  }
);

export const fetchMovieById = createAsyncThunk(
  "movies/fetchMovieById",
  async (id) => {
    const res = await omdbApi.get("", {
      params: { i: id }
    });
    return res.data;
  }
);
