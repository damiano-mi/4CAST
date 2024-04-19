import { unixHourConverter } from "../../../utilities/TimeConverter"
import { percentageCalculator } from "../../../utilities/WeatherCalculator"
import { useSelector } from "react-redux"
import { SvgIcon } from "../../SvgIcon"
import Popover from "../../Popover"
import { hourlySelector } from "../../../utilities/WeatherFilter"
import { RootState } from "../../../state/store"

export default function RainfallList() {

    const weatherData = useSelector((state: RootState) => state.weather.weather);
    const selectedDay = useSelector((state: RootState) => state.weather.selectedDay);
    const hourlyWeatherData = hourlySelector(weatherData.hourly, selectedDay);

    return (
        <>
            {hourlyWeatherData.map((hour) =>
                <div id="hourCard" key={hour.dt} className="text-white text-center bg-transparent shadow ms-2 me-2 mb-3 mt-1">
                    <p className="m-auto fs-2 fw-bold">{unixHourConverter(hour.dt) + ":00"}</p>
                    <Popover content={"Chance of rain: " + percentageCalculator(hour.pop)}>
                        <SvgIcon name={"raindrops"} alt={percentageCalculator(hour.pop)} style={{ opacity: hour.pop + 0.1, filter: "brightness(1.4)" }} />
                    </Popover>
                    <p className="my-auto fs-3">{percentageCalculator(hour.pop)}</p>

                </div>
            )}
        </>
    );

}