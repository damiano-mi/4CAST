import { beaufortScaleCalculator, windDirectionCalculator } from "../../../utilities/WeatherCalculator"
import { unixHourConverter } from "../../../utilities/TimeConverter"
import { useSelector } from "react-redux"
import { SvgIcon } from "../../SvgIcon"
import Popover from "../../Popover"
import { hourlySelector } from "../../../utilities/WeatherFilter"
import { RootState } from "../../../state/store"

export default function WindList() {

    const weatherData = useSelector((state: RootState) => state.weather.weather);
    const selectedDay = useSelector((state: RootState) => state.weather.selectedDay);
    const hourlyWeatherData = hourlySelector(weatherData.hourly, selectedDay);

    return (
        <>
            {hourlyWeatherData.map((hour) =>
                <div id="hourCard" key={hour.dt} className="text-white text-center bg-transparent shadow ms-2 me-2 mb-3 mt-1">
                    <p className="m-auto fs-2 fw-bold">{unixHourConverter(hour.dt) + ":00"}</p>
                    <Popover content={beaufortScaleCalculator(hour.wind_speed)[1] + ""}>
                        <SvgIcon
                            name={"wind-beaufort-" + beaufortScaleCalculator(hour.wind_speed)[0]}
                            alt={"" + hour.wind_speed}
                            style={{ filter: "brightness(4)", transform: "rotate(" + (90 + windDirectionCalculator(hour.wind_deg)) + "deg)" }}
                        />
                    </Popover>
                    <p className="m-auto fs-3 fw-light" id="bottomText">{hour.wind_speed + " m/s"}</p>

                </div>
            )}
        </>
    );

}