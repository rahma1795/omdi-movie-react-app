import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home";
import movieReducer from "../features/movies/movieSlice";

const renderWithRedux = (component) => {
  const store = configureStore({
    reducer: { movies: movieReducer },
  });
  return render(
    <Provider store={store}>
      <MemoryRouter>{component}</MemoryRouter>
    </Provider>
  );
};

test("renders home page title", () => {
  renderWithRedux(<Home />);
  expect(screen.getByText(/Movie Search/i)).toBeInTheDocument();
});

test("renders search box", () => {
  renderWithRedux(<Home />);
  expect(screen.getByPlaceholderText("Search movies by keyword...")).toBeInTheDocument();
});
