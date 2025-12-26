import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";

// Mock useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("MovieCard", () => {
  const mockNavigate = jest.fn();
  
  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders movie title and year", () => {
    const movie = { Title: "Batman", Year: "1989", Poster: "test.jpg", imdbID: "tt123" };
    render(
      <MemoryRouter>
        <MovieCard movie={movie} />
      </MemoryRouter>
    );
    expect(screen.getByText("Batman")).toBeInTheDocument();
    expect(screen.getByText("1989")).toBeInTheDocument();
  });

  test("renders poster image when valid", () => {
    const movie = { Title: "Batman", Poster: "test.jpg", imdbID: "tt123" };
    render(
      <MemoryRouter>
        <MovieCard movie={movie} />
      </MemoryRouter>
    );
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "test.jpg");
  });

  test("renders fallback when poster is N/A", () => {
    const movie = { Title: "Batman", Poster: "N/A", imdbID: "tt123" };
    render(
      <MemoryRouter>
        <MovieCard movie={movie} />
      </MemoryRouter>
    );
    expect(screen.getByText("No Image")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  test("handles image error", () => {
    const movie = { Title: "Batman", Poster: "invalid.jpg", imdbID: "tt123" };
    render(
      <MemoryRouter>
        <MovieCard movie={movie} />
      </MemoryRouter>
    );
    const img = screen.getByRole("img");
    
    // Simulate error
    fireEvent.error(img);
    
    expect(img).toHaveStyle("display: none");
    expect(img.parentNode).toHaveClass("poster-error");
  });

  test("opens and closes modal", () => {
    const movie = { Title: "Batman", Poster: "test.jpg", imdbID: "tt123" };
    const { container } = render(
      <MemoryRouter>
        <MovieCard movie={movie} />
      </MemoryRouter>
    );
    
    // Open modal
    const posterDiv = screen.getByRole("img").closest(".poster");
    fireEvent.click(posterDiv);
    
    // Check if modal overlay exists
    const overlay = container.querySelector(".modal-overlay");
    expect(overlay).toBeInTheDocument();
    
    // Close modal by clicking overlay
    fireEvent.click(overlay);
    
    // Modal should be gone
    expect(container.querySelector(".modal-overlay")).not.toBeInTheDocument();
  });

  test("does not open modal when clicking fallback poster", () => {
    const movie = { Title: "Batman", Poster: "N/A", imdbID: "tt123" };
    const { container } = render(
      <MemoryRouter>
        <MovieCard movie={movie} />
      </MemoryRouter>
    );
    
    const posterDiv = screen.getByText("No Image").closest(".poster");
    fireEvent.click(posterDiv);
    
    // Modal should not be open
    expect(container.querySelector(".modal-overlay")).not.toBeInTheDocument();
  });
  
  test("navigates to detail page on title click", () => {
    const movie = { Title: "Batman", Poster: "test.jpg", imdbID: "tt123" };
    render(
      <MemoryRouter>
        <MovieCard movie={movie} />
      </MemoryRouter>
    );
    
    fireEvent.click(screen.getByText("Batman"));
    expect(mockNavigate).toHaveBeenCalledWith("/movie/tt123");
  });
});
