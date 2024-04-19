import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { City } from "../types/types"

export const citiesAPI = createApi({

    reducerPath: "citiesAPI",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_CITIES_BASE_URL }),
    endpoints: (builder) => ({
        getCity: builder.query<City[], string>({
            query: (city) => "direct?q=" + city + "&limit=30&appid=" + process.env.REACT_APP_API_KEY

        }),
        getCityByCoords: builder.query<City[], { lat: number, lon: number }>({
            query: ({ lat, lon }) => "reverse?lat=" + lat + "&lon=" + lon + "&limit=5&appid=" + process.env.REACT_APP_API_KEY

        })
    }),

});

export const {
    useGetCityQuery,
    useGetCityByCoordsQuery
} = citiesAPI