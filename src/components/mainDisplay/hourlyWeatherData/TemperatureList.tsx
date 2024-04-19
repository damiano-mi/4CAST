import { unixHourConverter } from "../../../utilities/TimeConverter"
import { temperatureConverter } from "../../../utilities/WeatherCalculator"
import { RootState } from "../../../state/store"
import { useSelector } from "react-redux"
import { SvgIcon } from "../../SvgIcon"
import Popover from "../../Popover"
import { hourlySelector } from "../../../utilities/WeatherFilter"

function TemperatureList() {

    const selectedTemp = useSelector((state: RootState) => state.temperature.temperature);
    const weatherData = useSelector((state: RootState) => state.weather.weather);
    const selectedDay = useSelector((state: RootState) => state.weather.selectedDay);

    return (
        <>
            {weatherData && hourlySelector(weatherData.hourly, selectedDay).map((hour) =>
                <div id="hourCard" key={hour.dt} className="text-white text-center bg-transparent shadow ms-2 me-2 mb-3 mt-1">
                    <p className="m-auto fs-2 fw-bold">{unixHourConverter(hour.dt) + ":00"}</p>
                    <Popover content={"Feels like: " + temperatureConverter(hour.feels_like, selectedTemp)}>
                        <SvgIcon name={hour.weather[0].icon} alt={hour.weather[0].main} style={{}} />
                    </Popover>
                    <p className="my-auto fs-3" >{temperatureConverter(hour.temp, selectedTemp)}</p>

                </div>
            )}
        </>
    );

}

export default TemperatureList;
