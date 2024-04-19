import { moonPhaseCalculator, percentageCalculator } from "../../../utilities/WeatherCalculator"
import { unixHourConverter, unixMinutesConverter } from "../../../utilities/TimeConverter"
import { upperCaseFormat } from "../../../utilities/StringFormat"
import { SvgIcon } from "../../SvgIcon"
import Popover from "../../Popover"
import { daySelector } from "../../../utilities/WeatherFilter"
import { RootState } from "../../../state/store"
import { useSelector } from "react-redux"

type Appereance = "sunrise" | "sunset" | "moonrise" | "moonset"

export default function SunMoonList() {

    const appereances: Appereance[] = ["sunrise", "sunset", "moonrise", "moonset"];
    const weatherData = useSelector((state: RootState) => state.weather.weather);
    const selectedDay = useSelector((state: RootState) => state.weather.selectedDay);
    const dayWeatherData = daySelector(weatherData.daily, selectedDay);

    return (
        <>
            {dayWeatherData && appereances.map((app: Appereance, id: number) =>
            (
                <div id="hourCard" className="text-white text-center bg-transparent shadow ms-2 me-2 mb-3 mt-1" key={app}>
                    <p className="m-auto fs-2 fw-bold">{unixHourConverter(dayWeatherData[app]) + ":" + unixMinutesConverter(dayWeatherData[app])}</p>
                    <SvgIcon name={app} alt={app} style={{}} />
                    <p className="my-auto fs-3" id="bottomText">{upperCaseFormat(app)}</p>
                </div>
            ))}
            {dayWeatherData &&
                <div id="hourCard" className="text-white text-center bg-transparent shadow ms-2 me-2 mb-3 mt-1">
                    <p className="m-auto fs-2 fw-bold">Moon</p>
                    <Popover content={moonPhaseCalculator(dayWeatherData.moon_phase)[1]}>
                        <SvgIcon name={moonPhaseCalculator(dayWeatherData.moon_phase)[0]} alt={moonPhaseCalculator(dayWeatherData.moon_phase)[1]} style={{}} />
                    </Popover>
                    <p className="my-auto fs-3">{percentageCalculator(dayWeatherData.moon_phase)}</p>
                </div>
            }
        </>
    );
}