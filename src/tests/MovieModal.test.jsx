import { render, screen, fireEvent } from "@testing-library/react";
import MovieModal from "../components/MovieModal";

test("renders modal with poster", () => {
  const posterUrl = "test-poster.jpg";
  render(<MovieModal poster={posterUrl} onClose={() => {}} />);
  
  const img = screen.getByRole("img");
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute("src", posterUrl);
});

test("calls onClose when overlay is clicked", () => {
  const handleClose = jest.fn();
  const { container } = render(<MovieModal poster="test.jpg" onClose={handleClose} />);
  
  // The overlay is the outer div
  fireEvent.click(container.firstChild);
  expect(handleClose).toHaveBeenCalledTimes(1);
});
