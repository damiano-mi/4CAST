import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Weather } from "../types/types"

export const weatherAPI = createApi({
    reducerPath: "weatherAPI",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_WEATHER_BASE_URL }),
    endpoints: (builder) => ({
        getWeather: builder.query<Weather, { lat: number, lon: number }>({
            query: ({ lat, lon }) => "onecall?lat=" + lat + "&lon=" + lon + "&appid=" + process.env.REACT_APP_API_KEY
        }),
    }),
});

export const {
    useGetWeatherQuery
} = weatherAPI