import { configureStore } from "@reduxjs/toolkit";
import { fetchMovies, fetchMovieById } from "../features/movies/movieThunks";
import { omdbApi } from "../service/omdbApi";

jest.mock("../service/omdbApi");

describe("movieThunks", () => {
    let store;

    beforeEach(() => {
        store = configureStore({
            reducer: (state = {}, action) => state,
        });
        jest.clearAllMocks();
    });

    describe("fetchMovies", () => {
        test("should fetch movies successfully", async () => {
            const mockData = { Search: [] };
            omdbApi.get.mockResolvedValue({ data: mockData });

            const result = await store.dispatch(fetchMovies({ search: "test", page: 1 }));

            expect(omdbApi.get).toHaveBeenCalledWith("", {
                params: { s: "test", page: 1 },
            });
            expect(result.type).toBe("movies/fetchMovies/fulfilled");
            expect(result.payload).toEqual(mockData);
        });

        test("should handle fetch movies failure", async () => {
            const error = new Error("Network Error");
            omdbApi.get.mockRejectedValue(error);

            const result = await store.dispatch(fetchMovies({ search: "test", page: 1 }));

            expect(result.type).toBe("movies/fetchMovies/rejected");
        });
    });

    describe("fetchMovieById", () => {
        test("should fetch movie by id successfully", async () => {
            const mockData = { Title: "Movie 1" };
            omdbApi.get.mockResolvedValue({ data: mockData });

            const result = await store.dispatch(fetchMovieById("tt1234567"));

            expect(omdbApi.get).toHaveBeenCalledWith("", {
                params: { i: "tt1234567" },
            });
            expect(result.type).toBe("movies/fetchMovieById/fulfilled");
            expect(result.payload).toEqual(mockData);
        });

        test("should handle fetch movie by id failure", async () => {
            const error = new Error("Network Error");
            omdbApi.get.mockRejectedValue(error);

            const result = await store.dispatch(fetchMovieById("tt1234567"));

            expect(result.type).toBe("movies/fetchMovieById/rejected");
        });
    });
});
