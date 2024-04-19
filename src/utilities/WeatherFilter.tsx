import { unixDateConverter } from "./TimeConverter"
import { DailyWeather, HourlyWeather } from "../types/types"

// Checks if the array contains a certain date
export function hourlyExists(hourly: HourlyWeather[], date: number) {

    let exists = false;

    for (let i = 0; i < hourly.length; i++) {
        if (unixDateConverter(hourly[i].dt) === unixDateConverter(date)) {
            exists = true;
            break;
        }
    }

    return exists;
}

export function hourlySelector(hourly: HourlyWeather[], date: number){
    return hourly.filter((hour: HourlyWeather) => unixDateConverter(hour.dt) === unixDateConverter(date));
}

export function daySelector(daily: DailyWeather[], date: number){
    return daily.find((day: DailyWeather) => unixDateConverter(day.dt) === unixDateConverter(date));
}