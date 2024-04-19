import { temperatureConverter } from "../../../utilities/WeatherCalculator"
import { RootState } from "../../../state/store"
import { useSelector } from "react-redux"
import { SvgIcon } from "../../SvgIcon"
import Popover from "../../Popover"
import { daySelector } from "../../../utilities/WeatherFilter"

type TimeDivision = "morn" | "day" | "eve" | "night"
type Timestamps = "06:00" | "12:00" | "18:00" | "21:00"

function TemperatureRoughList() {

    const selectedTemp = useSelector((state: RootState) => state.temperature.temperature);
    const timeDivisions: TimeDivision[] = ["morn", "day", "eve", "night"]
    const timestamps: Timestamps[] = ["06:00", "12:00", "18:00", "21:00"]
    const weatherData = useSelector((state: RootState) => state.weather.weather);
    const selectedDay = useSelector((state: RootState) => state.weather.selectedDay);
    const dayWeatherData = daySelector(weatherData.daily, selectedDay);

    return (
        <>
            {dayWeatherData && timeDivisions.map((div: TimeDivision, id: number) =>
            (
                <div id="hourCard" className="text-white text-center bg-transparent shadow ms-2 me-2 mb-3 mt-1" key={div}>
                    <p className="m-auto fs-2 fw-bold">{timestamps[id]}</p>
                    <Popover content={"Feels like: " + temperatureConverter(dayWeatherData.feels_like[div], selectedTemp)}>
                        <SvgIcon name={dayWeatherData.weather[0].icon.slice(0, -1) + (div === "night" ? "n" : "d")} alt={dayWeatherData.weather[0].main} style={{}} />
                    </Popover>
                    <p className="my-auto fs-3">{temperatureConverter(dayWeatherData.temp[div], selectedTemp)}</p>
                </div>
            ))}
            <div id="hourCard" className="bg-transparent ms-2 me-2 mb-3 mt-1"></div>
        </>
    );
}

export default TemperatureRoughList;