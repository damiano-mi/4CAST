import { unixDayConverter, unixMonthNameConverter, unixWeekNameConverter } from "../../utilities/TimeConverter"
import { temperatureShortConverter } from "../../utilities/WeatherCalculator"
import { setSelectedDay } from "../../state/weather/weatherSlice"
import { AppDispatch, RootState } from "../../state/store"
import { useDispatch, useSelector } from "react-redux"
import "../../assets/styles/forecast.css"
import { SvgIcon } from "../SvgIcon"
import { useState } from "react"

export default function ForecastList() {

    const selectedTemp = useSelector((state: RootState) => state.temperature.temperature);
    const weatherData = useSelector((state: RootState) => state.weather.weather);
    const isLoading = useSelector((state: RootState) => state.weather.isLoading);
    const dispatch = useDispatch<AppDispatch>();
    const [selectedCard, setSelectedCard] = useState<number>();

    function handleDay(dt: number) {
        dispatch(setSelectedDay(dt));
        setSelectedCard(dt);
    }
    
    return (
        <div>
            <div className="card-group card-group-scroll mb-2" id="forecast">
                {!isLoading && weatherData && weatherData.daily.map((day) => {
                    return (
                        <a href="#navbar"
                            id="dayCard"
                            className={"card text-white text-center bg-opacity-25 bg-gradient shadow rounded-5 ms-2 me-2 mb-3 mt-1 " + (selectedCard === day.dt && "clicked")}
                            onClick={() => handleDay(day.dt)}
                            key={day.dt}
                        >
                            <div className="m-auto">
                                <p className="fs-4 my-auto fw-bold" id="week">{unixWeekNameConverter(day.dt)}</p>
                                <p className="fs-5 my-auto regular-text">{unixMonthNameConverter(day.dt) + " " + unixDayConverter(day.dt)}</p>
                                <SvgIcon name={day.weather[0].icon} alt={day.weather[0].main} style={{ width: 100 }} />
                                <div className="row m-auto" id="temp">
                                    <p className="col fs-3 ms-4 fw-bold my-auto maxTemp">{temperatureShortConverter(day.temp.max, selectedTemp)}</p>
                                    <p className="col fs-3 me-4 fw-bold my-auto minTemp">{temperatureShortConverter(day.temp.min, selectedTemp)}</p>
                                </div>
                            </div>
                        </a>
                    )
                })}
            </div>
        </div>
    );
}