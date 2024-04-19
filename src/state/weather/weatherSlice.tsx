import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Weather } from "../../types/types"

export type WeatherConditionParameter = "temperature" | "rainfall" | "wind" | "sunrise" | "uvi" | "cloudiness"

interface WeatherState {
    weather: Weather,
    selectedDay: number,
    selectedParameter: WeatherConditionParameter,
    isLoading: boolean
}

const initialState: WeatherState = {
    weather: {
        lat: 0,
        lon: 0,
        timezone: "",
        timezone_offset: 0,
        current: {
            dt: 0,
            sunrise: 0,
            sunset: 0,
            temp: 0,
            feels_like: 0,
            pressure: 0,
            humidity: 0,
            dew_point: 0,
            uvi: 0,
            clouds: 0,
            visibility: 0,
            wind_speed: 0,
            wind_deg: 0,
            wind_gust: 0,
            weather: [
                {
                    id: 0,
                    main: "",
                    description: "",
                    icon: ""
                }
            ]
        },
        minutely: [
            {
                dt: 0,
                precipitation: 0
            },
        ],
        hourly: [
            {
                dt: 0,
                temp: 0,
                feels_like: 0,
                pressure: 0,
                humidity: 0,
                dew_point: 0,
                uvi: 0,
                clouds: 0,
                visibility: 0,
                wind_speed: 0,
                wind_deg: 0,
                wind_gust: 0,
                weather: [
                    {
                        id: 0,
                        main: "",
                        description: "",
                        icon: ""
                    }
                ],
                pop: 0
            }
        ],
        daily: [
            {
                dt: 0,
                sunrise: 0,
                sunset: 0,
                moonrise: 0,
                moonset: 0,
                moon_phase: 0,
                summary: "",
                temp: {
                    day: 0,
                    min: 0,
                    max: 0,
                    night: 0,
                    eve: 0,
                    morn: 0
                },
                feels_like: {
                    day: 0,
                    night: 0,
                    eve: 0,
                    morn: 0
                },
                pressure: 0,
                humidity: 0,
                dew_point: 0,
                wind_speed: 0,
                wind_deg: 0,
                wind_gust: 0,
                weather: [
                    {
                        id: 0,
                        main: "",
                        description: "",
                        icon: ""
                    }
                ],
                clouds: 0,
                pop: 0,
                rain: 0,
                uvi: 0
            }
        ],
        alerts: [
            {
                sender_name: "",
                event: "",
                start: 0,
                end: 0,
                description: "",
                tags: []
            }
        ]
    },
    selectedDay: Math.floor(Date.now() / 1000),
    selectedParameter: "temperature",
    isLoading: true
}

const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        setWeather: (state, action: PayloadAction<Weather>) => {
            state.weather = action.payload;
        },
        setSelectedDay: (state, action: PayloadAction<number>) => {
            state.selectedDay = action.payload;
        },
        setParameter: (state, action: PayloadAction<WeatherConditionParameter>) => {
            state.selectedParameter = action.payload;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }
    }
});

export const { setWeather, setSelectedDay, setParameter, setIsLoading } = weatherSlice.actions;
export default weatherSlice.reducer;