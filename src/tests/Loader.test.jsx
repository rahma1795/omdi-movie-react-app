import { render, renderHook, act } from "@testing-library/react";
import useScrollShadow from "../hooks/useScrollShadow";
import Loader from "../components/Loader";

test("renders loader", () => {
  const { container } = render(<Loader />);
  expect(container.firstChild).toHaveClass("loader");
});

test("renders white loader", () => {
  const { container } = render(<Loader white />);
  expect(container.firstChild).toHaveClass("loader white");
});

describe("useScrollShadow", () => {
  it("returns false when scroll is below threshold", () => {
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });

    const { result } = renderHook(() => useScrollShadow());
    expect(result.current).toBe(false);
  });

  it("returns true when scroll is above threshold", () => {
    Object.defineProperty(window, "scrollY", { value: 20, writable: true });

    const { result } = renderHook(() => useScrollShadow());

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current).toBe(true);
  });

  it("cleans up event listener on unmount", () => {
    const removeSpy = jest.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() => useScrollShadow());
    unmount();

    expect(removeSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
  });
});

