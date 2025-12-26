import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import SearchBox from "../components/SearchBox";
import movieReducer from "../features/movies/movieSlice";
import useScrollShadow from "../hooks/useScrollShadow";
import * as movieSlice from "../features/movies/movieSlice";
import * as movieThunks from "../features/movies/movieThunks";

// Mock the custom hook
jest.mock("../hooks/useScrollShadow");

// Mock the thunk
jest.mock("../features/movies/movieThunks", () => {
  const mockFetch = jest.fn(() => ({ type: "movies/fetchMovies/pending" }));
  Object.assign(mockFetch, {
    pending: { type: "movies/fetchMovies/pending" },
    fulfilled: { type: "movies/fetchMovies/fulfilled" },
    rejected: { type: "movies/fetchMovies/rejected" },
  });

  const mockFetchById = jest.fn(() => ({ type: "movies/fetchMovieById/pending" }));
  Object.assign(mockFetchById, {
    pending: { type: "movies/fetchMovieById/pending" },
    fulfilled: { type: "movies/fetchMovieById/fulfilled" },
    rejected: { type: "movies/fetchMovieById/rejected" },
  });

  return {
    __esModule: true,
    fetchMovies: mockFetch,
    fetchMovieById: mockFetchById,
  };
});

import { fetchMovies } from "../features/movies/movieThunks";

describe("SearchBox", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: { movies: movieReducer },
    });
    jest.clearAllMocks();
  });

  test("renders search input", () => {
    useScrollShadow.mockReturnValue(false);
    render(
      <Provider store={store}>
        <SearchBox />
      </Provider>
    );
    const input = screen.getByPlaceholderText("Search movies by keyword...");
    expect(input).toBeInTheDocument();
  });

  test("applies shadow class when scrolled", () => {
    useScrollShadow.mockReturnValue(true);
    const { container } = render(
      <Provider store={store}>
        <SearchBox />
      </Provider>
    );
    expect(container.firstChild).toHaveClass("shadow");
  });

  test("does not apply shadow class when not scrolled", () => {
    useScrollShadow.mockReturnValue(false);
    const { container } = render(
      <Provider store={store}>
        <SearchBox />
      </Provider>
    );
    expect(container.firstChild).not.toHaveClass("shadow");
  });

  test("dispatches actions on input change", () => {
    useScrollShadow.mockReturnValue(false);
    
    // Spy on dispatch
    const dispatchSpy = jest.spyOn(store, "dispatch");
    
    // Spy on action creators
    const resetMoviesSpy = jest.spyOn(movieSlice, "resetMovies");
    const setSearchSpy = jest.spyOn(movieSlice, "setSearch");
    
    fetchMovies.mockReturnValue({ type: "movies/fetchMovies/pending" });

    render(
      <Provider store={store}>
        <SearchBox />
      </Provider>
    );
    
    const input = screen.getByPlaceholderText("Search movies by keyword...");
    fireEvent.change(input, { target: { value: "Batman" } });
    
    expect(input.value).toBe("Batman");
    
    // Verify actions were dispatched
    expect(resetMoviesSpy).toHaveBeenCalled();
    expect(setSearchSpy).toHaveBeenCalledWith("Batman");
    expect(fetchMovies).toHaveBeenCalledWith({ search: "Batman", page: 1 });
    
    // Verify dispatch call count (reset, setSearch, fetchMovies)
    // Note: fetchMovies returns an action object which is dispatched
    expect(dispatchSpy).toHaveBeenCalledTimes(3);
  });
});
