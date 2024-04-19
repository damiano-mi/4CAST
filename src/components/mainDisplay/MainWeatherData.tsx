import { temperatureConverter } from "../../utilities/WeatherCalculator"
import { unixDateConverter } from "../../utilities/TimeConverter"
import { upperCaseFormat } from "../../utilities/StringFormat"
import { DailyWeather, Weather } from "../../types/types"
import * as Icon from "react-bootstrap-icons"
import { RootState } from "../../state/store"
import { useSelector } from "react-redux"
import { SvgIcon } from "../SvgIcon"
import Popover from "../Popover"

type MainWeatherDataProps = {
    weatherData: Weather
}

const MainWeatherData: React.FC<MainWeatherDataProps> = ({ weatherData }: MainWeatherDataProps) => {

    const selectedTemp = useSelector((state: RootState) => state.temperature.temperature);
    const selectedDay = useSelector((state: RootState) => state.weather.selectedDay);

    const displayedWeatherData = (
        unixDateConverter(selectedDay) === unixDateConverter(weatherData.current.dt) ?
            weatherData.current :
            weatherData.daily.filter((day: DailyWeather) => unixDateConverter(day.dt) === unixDateConverter(selectedDay))[0]
    )

    return (
        <div className="m-auto">
            <div className="row" id="displayedData">
                <div className="col d-flex flex-column justify-content-md-center m-auto" id="tempSide">
                    <div className="row align-items-center m-auto">
                        {
                            typeof displayedWeatherData.temp === "number" && typeof displayedWeatherData.feels_like === "number" ?
                                (<Popover content={"Feels like: " + temperatureConverter(displayedWeatherData.feels_like, selectedTemp)}>
                                    <div className="fs-1 fw-bold">
                                        <Icon.ThermometerHalf size={40} className="mb-2 me-2" />
                                        {temperatureConverter(displayedWeatherData.temp, selectedTemp)}
                                    </div>
                                </Popover>) :
                                typeof displayedWeatherData.temp !== "number" && typeof displayedWeatherData.feels_like !== "number" &&
                                (<Popover content={"Feels like: " + temperatureConverter(displayedWeatherData.feels_like.day, selectedTemp)}>
                                    <div className="fs-1 fw-bold">
                                        <Icon.ThermometerHalf size={40} className="mb-2 me-2" />
                                        {temperatureConverter(displayedWeatherData.temp.day, selectedTemp)}
                                    </div>
                                </Popover>)
                        }
                    </div>
                </div>
                <div className="col d-flex flex-column justify-content-md-center">
                    <div className="row justify-content-center m-auto ">
                        <SvgIcon name={displayedWeatherData.weather[0].icon} alt={displayedWeatherData.weather[0].main} style={{}} />
                    </div>
                </div>
                <div className="col justify-content-center m-auto d-inline-flex" >
                    <div id="rightSide" className="fw-bold">
                        <div className="mb-3">
                            <Popover content={"Wind speed"}>
                                <Icon.Wind className="me-2 mb-1" />{displayedWeatherData.wind_speed + " m/s"}
                            </Popover>
                        </div>
                        <div className="mb-3">
                            <Popover content={"Humidity"}>
                                <Icon.DropletHalf className="me-2 mb-1" />{displayedWeatherData.humidity + "%"}
                            </Popover>
                        </div>
                        <div>
                            <Popover content={"Cloudiness"}>
                                <Icon.CloudsFill className="me-2 mb-1" />{displayedWeatherData.clouds + "%"}
                            </Popover>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center m-auto d-inline-flex" >
                <p className="fs-2 fw-bold m-auto mb-1">{upperCaseFormat(displayedWeatherData.weather[0].description)}</p>
            </div>
        </div>
    );
}

export default MainWeatherData;