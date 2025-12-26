import movieReducer, { resetMovies, setSearch } from "../features/movies/movieSlice";
import { fetchMovies, fetchMovieById } from "../features/movies/movieThunks";

describe("movieSlice", () => {
    const initialState = {
        list: [],
        selected: null,
        loading: false,
        page: 1,
        totalResults: 0,
        search: "",
    };

    test("should handle initial state", () => {
        expect(movieReducer(undefined, { type: "unknown" })).toEqual(initialState);
    });

    test("should handle resetMovies", () => {
        const previousState = {
            ...initialState,
            list: [{ Title: "Movie 1" }],
            page: 2,
        };
        expect(movieReducer(previousState, resetMovies())).toEqual({
            ...initialState,
            list: [],
            page: 1,
        });
    });

    test("should handle setSearch", () => {
        expect(movieReducer(initialState, setSearch("Batman"))).toEqual({
            ...initialState,
            search: "Batman",
        });
    });

    describe("extraReducers", () => {
        test("should handle fetchMovies.pending", () => {
            expect(movieReducer(initialState, fetchMovies.pending)).toEqual({
                ...initialState,
                loading: true,
            });
        });

        test("should handle fetchMovies.fulfilled with results", () => {
            const payload = {
                Search: [{ Title: "Movie 1" }],
                totalResults: 1,
            };
            const action = { type: fetchMovies.fulfilled.type, payload };
            const expectedState = {
                ...initialState,
                loading: false,
                list: [{ Title: "Movie 1" }],
                totalResults: 1,
                page: 2,
            };
            expect(movieReducer(initialState, action)).toEqual(expectedState);
        });

        test("should handle fetchMovies.fulfilled without results", () => {
            const payload = {};
            const action = { type: fetchMovies.fulfilled.type, payload };
            expect(movieReducer(initialState, action)).toEqual({
                ...initialState,
                loading: false,
            });
        });

        test("should handle fetchMovieById.fulfilled", () => {
            const payload = { Title: "Movie 1" };
            const action = { type: fetchMovieById.fulfilled.type, payload };
            expect(movieReducer(initialState, action)).toEqual({
                ...initialState,
                selected: payload,
            });
        });
    });
});
