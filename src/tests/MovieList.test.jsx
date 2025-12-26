import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import MovieList from "../components/MovieList";
import movieReducer from "../features/movies/movieSlice";
import { fetchMovies } from "../features/movies/movieThunks";

jest.mock("../features/movies/movieThunks");

const renderWithRedux = (component, initialState) => {
  const store = configureStore({
    reducer: { movies: movieReducer },
    preloadedState: { movies: initialState },
  });
  store.dispatch = jest.fn();
  return { ...render(
    <Provider store={store}>
      <MemoryRouter>{component}</MemoryRouter>
    </Provider>
  ), store };
};

describe("MovieList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetchMovies.mockReturnValue({ type: "movies/fetchMovies/pending" });
  });

  test("renders movie list", () => {
    const initialState = {
      list: [
        { imdbID: "1", Title: "Movie 1", Poster: "poster1.jpg" },
        { imdbID: "2", Title: "Movie 2", Poster: "poster2.jpg" },
      ],
      loading: false,
      page: 1,
      totalResults: 2,
      search: "test",
    };

    renderWithRedux(<MovieList />, initialState);

    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Movie 2")).toBeInTheDocument();
  });

  test("renders loader when loading", () => {
    const initialState = {
      list: [],
      loading: true,
      page: 1,
      totalResults: 0,
      search: "test",
    };

    const { container } = renderWithRedux(<MovieList />, initialState);
    // Check for loader class
    expect(container.querySelector(".loader")).toBeInTheDocument();
  });

  test("dispatches fetchMovies on scroll when conditions are met", () => {
    const initialState = {
      list: [{ imdbID: "1", Title: "Movie 1" }],
      loading: false,
      page: 1,
      totalResults: 10,
      search: "test",
    };

    const { store } = renderWithRedux(<MovieList />, initialState);
    jest.clearAllMocks(); // Clear initial fetch

    // Mock scroll dimensions
    Object.defineProperty(window, "innerHeight", { writable: true, configurable: true, value: 500 });
    Object.defineProperty(window, "scrollY", { writable: true, configurable: true, value: 500 });
    Object.defineProperty(document.body, "offsetHeight", { writable: true, configurable: true, value: 1000 });

    fireEvent.scroll(window);

    expect(fetchMovies).toHaveBeenCalledWith({ search: "test", page: 1 });
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("does not dispatch fetchMovies when loading", () => {
    const initialState = {
      list: [{ imdbID: "1", Title: "Movie 1" }],
      loading: true,
      page: 1,
      totalResults: 10,
      search: "test",
    };

    const { store } = renderWithRedux(<MovieList />, initialState);
    jest.clearAllMocks(); // Clear initial fetch

    // Mock scroll dimensions
    Object.defineProperty(window, "innerHeight", { writable: true, configurable: true, value: 500 });
    Object.defineProperty(window, "scrollY", { writable: true, configurable: true, value: 500 });
    Object.defineProperty(document.body, "offsetHeight", { writable: true, configurable: true, value: 1000 });

    fireEvent.scroll(window);

    expect(fetchMovies).not.toHaveBeenCalled();
  });

  test("does not dispatch fetchMovies when all results loaded", () => {
    const initialState = {
      list: [{ imdbID: "1", Title: "Movie 1" }],
      loading: false,
      page: 1,
      totalResults: 1,
      search: "test",
    };

    const { store } = renderWithRedux(<MovieList />, initialState);
    jest.clearAllMocks(); // Clear initial fetch

    // Mock scroll dimensions
    Object.defineProperty(window, "innerHeight", { writable: true, configurable: true, value: 500 });
    Object.defineProperty(window, "scrollY", { writable: true, configurable: true, value: 500 });
    Object.defineProperty(document.body, "offsetHeight", { writable: true, configurable: true, value: 1000 });

    fireEvent.scroll(window);

    expect(fetchMovies).not.toHaveBeenCalled();
  });

  test("does not dispatch fetchMovies on mount if search is empty", () => {
    const initialState = {
      list: [],
      loading: false,
      page: 1,
      totalResults: 0,
      search: "",
    };

    renderWithRedux(<MovieList />, initialState);
    expect(fetchMovies).not.toHaveBeenCalled();
  });
});
