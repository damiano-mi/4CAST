import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { City } from "../../types/types"

interface CityState {
    city: City
}

const initialState: CityState = {
    city: {
        name: "London",
        local_names: {},
        lat: 51.5073219,
        lon: -0.1276474,
        country: "GB",
        state: "England"
    }
}

const citySlice = createSlice({
    name: "city",
    initialState,
    reducers: {
        setCity: (state, action: PayloadAction<City>) => {
            state.city = action.payload;
        },
        setCoords: (state, action: PayloadAction<{ lat: number, lon: number }>) => {
            state.city.lat = action.payload.lat;
            state.city.lon = action.payload.lon;
        }
    }
});

export const citySelector = (state: { city: CityState }) => state.city.city;
export const { setCity, setCoords } = citySlice.actions;
export default citySlice.reducer;