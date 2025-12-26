import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import MovieDetail from "../pages/MovieDetail";
import movieReducer from "../features/movies/movieSlice";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

beforeAll(() => {
  jest.spyOn(console, "warn").mockImplementation(() => {});
});

afterAll(() => {
  console.warn.mockRestore();
});

const initialState = {
  selected: {
    Title: "Test Movie",
    Poster: "",
    Plot: "Plot",
    imdbRating: "7",
    imdbVotes: "100",
    Type: "movie",
    Runtime: "100 min",
    Rated: "R",
    Genre: "Drama",
    Director: "Dir",
    Actors: "Actor",
  },
  loading: false,
};

const renderWithRedux = (component, initialState, initialRoute = "/movie/tt1234567") => {
  const store = configureStore({
    reducer: { movies: movieReducer },
    preloadedState: { movies: initialState },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/movie/:id" element={component} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

test("renders movie details", () => {
  const initialState = {
    selected: {
      Title: "Test Movie",
      Year: "2023",
      Poster: "poster.jpg",
      Plot: "Test Plot",
      imdbRating: "8.5",
      imdbVotes: "1000",
      Type: "movie",
      Runtime: "120 min",
      Rated: "PG-13",
      Genre: "Action, Adventure",
      Director: "Test Director",
      Actors: "Actor 1, Actor 2",
    },
    loading: false,
  };

  renderWithRedux(<MovieDetail />, initialState);

  expect(screen.getByText("Test Movie")).toBeInTheDocument();
  expect(screen.getByText("Test Plot")).toBeInTheDocument();
  expect(screen.getByText(/Test Director/)).toBeInTheDocument();
});

test("renders loader when loading", () => {
  const initialState = {
    selected: null,
    loading: true,
  };

  const { container } = renderWithRedux(<MovieDetail />, initialState);
  expect(container.querySelector(".loader")).toBeInTheDocument();
});

test("clicking back button navigates to home", () => {
  renderWithRedux(<MovieDetail />, initialState);

  const backButton = screen.getByText("<< Back");
  fireEvent.click(backButton);

  expect(mockNavigate).toHaveBeenCalledTimes(1);
  expect(mockNavigate).toHaveBeenCalledWith("/");
});