import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export type TemperatureScale = "C" | "K" | "F";

interface TemperatureState {
    temperature: TemperatureScale;
}

const initialState: TemperatureState = {
    temperature: "C"
}

const temperatureSlice = createSlice({
    name: "temperature",
    initialState,
    reducers: {
        setTemperature: (state, action: PayloadAction<TemperatureScale>) => {
            state.temperature = action.payload;
        }
    }
});

export const { setTemperature } = temperatureSlice.actions;
export default temperatureSlice.reducer;