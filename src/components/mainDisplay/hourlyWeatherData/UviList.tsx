import { unixHourConverter } from "../../../utilities/TimeConverter"
import { uviScaleCalculator } from "../../../utilities/WeatherCalculator"
import { useSelector } from "react-redux"
import { SvgIcon } from "../../SvgIcon"
import Popover from "../../Popover"
import { RootState } from "../../../state/store"
import { hourlySelector } from "../../../utilities/WeatherFilter"

export default function UviList() {

    const weatherData = useSelector((state: RootState) => state.weather.weather);
    const selectedDay = useSelector((state: RootState) => state.weather.selectedDay);
    const hourlyWeatherData = hourlySelector(weatherData.hourly, selectedDay);

    return (
        <>
            {hourlyWeatherData.map((hour) =>
                <div id="hourCard" key={hour.dt} className="text-white text-center bg-transparent shadow ms-2 me-2 mb-3 mt-1">
                    <p className="m-auto fs-2 fw-bold">{unixHourConverter(hour.dt) + ":00"}</p>
                    <Popover content={"UVI index: " + hour.uvi}>
                        <SvgIcon name={"uv-index-" + Math.trunc(hour.uvi)} alt={"" + hour.uvi} style={{}} />
                    </Popover>
                    <p className="my-auto fs-3" id="bottomText">{uviScaleCalculator(hour.uvi)}</p>

                </div>
            )}
        </>
    );

}