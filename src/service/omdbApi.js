import axios from "axios";

export const omdbApi = axios.create({
    baseURL: "https://www.omdbapi.com/",
    params: {
        apikey: "faf7e5bb"
    }
});