import { unixHourConverter } from "../../../utilities/TimeConverter"
import { useSelector } from "react-redux"
import { SvgIcon } from "../../SvgIcon"
import Popover from "../../Popover"
import { RootState } from "../../../state/store"
import { hourlySelector } from "../../../utilities/WeatherFilter"

export default function CloudinessList() {

    const weatherData = useSelector((state: RootState) => state.weather.weather);
    const selectedDay = useSelector((state: RootState) => state.weather.selectedDay);
    const hourlyWeatherData = hourlySelector(weatherData.hourly, selectedDay);

    return (
        <>
            {hourlyWeatherData.map((hour) =>
                <div id="hourCard" key={hour.dt} className="text-white text-center bg-transparent shadow ms-2 me-2 mb-3 mt-1">

                    <p className="m-auto fs-2 fw-bold">{unixHourConverter(hour.dt) + ":00"}</p>
                    <Popover content={"Cloudiness: " + hour.clouds + "%"}>
                        <SvgIcon name={"overcast"} alt={hour.clouds + "%"} style={{ opacity: hour.clouds / 100 + 0.1, filter: "brightness(1.4)" }} />
                    </Popover>
                    <p className="my-auto fs-3">{hour.clouds + "%"}</p>

                </div>
            )}
        </>
    );

}