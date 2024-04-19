import { unixDateConverter, unixAllInfoConverter, unixWeekNameConverter } from "../../utilities/TimeConverter"
import { setIsLoading, setWeather } from "../../state/weather/weatherSlice"
import TemperatureScaleSelector from "../buttons/TemperatureScaleSelector"
import { cityNameFormat } from "../../utilities/StringFormat"
import { hourlyExists } from "../../utilities/WeatherFilter"
import { AppDispatch, RootState } from "../../state/store"
import HourlyWeatherLayout from "./HourlyWeatherLayout"
import { weatherAPI } from "../../services/weatherAPI"
import { useDispatch, useSelector } from "react-redux"
import LocationButton from "../buttons/LocationButton"
import MainWeatherData from "./MainWeatherData"
import * as Icon from "react-bootstrap-icons"
import "../../assets/styles/main.css"
import Flag from "react-world-flags"
import { useEffect } from "react"

export default function MainWeatherLayout() {

    const useGetWeatherQuery = weatherAPI.endpoints.getWeather.useQuery;
    const city = useSelector((state: RootState) => state.city.city);
    const { data, isLoading } = useGetWeatherQuery({ lat: city.lat, lon: city.lon });
    const selectedDay = useSelector((state: RootState) => state.weather.selectedDay);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(setWeather(data!));
        dispatch(setIsLoading(isLoading));
    }, [data, dispatch, isLoading]);

    return (
        <>
            {/* Loading spinner */}
            {isLoading && <div className="d-flex justify-content-center">
                <div className="spinner-border text-white">
                    <span className="visually-hidden">Loading</span>
                </div>
            </div>}

            {/* Main weather card */}
            {!isLoading && data &&
                <div className="card text-center text-white bg-dark bg-opacity-25 bg-gradient border-0 rounded-5 shadow" id="mainDisplay">
                    { /* Head card */}
                    <div className="card-title mt-2 custom-shadow" >
                        <div className="row" id="mainTitle">

                            { /* Left button */}
                            <div className="col-md-auto">
                                <TemperatureScaleSelector />
                            </div>

                            <div className="col mt-1">
                                { /* Title - City name */}
                                <div className="row ">
                                    <h1 className={"mb-1 " + (cityNameFormat(city.name, city.state).length > 35 ? "fs-4" : "fs-2")}>
                                        <Icon.GeoAltFill size={25} className="me-2 mb-2" />
                                        {cityNameFormat(city.name, city.state)}
                                        <Flag code={city.country} height="20" className="ms-2 mb-1" />
                                    </h1>
                                </div>
                                { /* Selected day - Now/Next 8 days */}
                                <div className="row m-auto" style={{ maxWidth: "260px" }}>
                                    <div className="card fs-6 fw-bold bg-light bg-gradient bg-opacity-25 text-white">
                                        <p className="m-auto">{
                                            unixDateConverter(selectedDay) === unixDateConverter(data.current.dt) ?
                                                "Now " + unixAllInfoConverter(data.current.dt) : unixWeekNameConverter(selectedDay) + " " + unixAllInfoConverter(selectedDay)
                                        }</p>
                                    </div>
                                </div>
                            </div>

                            { /* Right button */}
                            <div className="col-md-auto" id="smallButtons">
                                <TemperatureScaleSelector />
                                <LocationButton />
                            </div>

                        </div>
                    </div>

                    { /* Center body weahter data */}
                    <div className="">
                        { /* Current/General weather of the selected day */
                            <MainWeatherData weatherData={data} />
                        }
                    </div>

                    {/* Hourly weather list */}
                    <div className="card-footer bg-transparent">
                        <HourlyWeatherLayout precise={hourlyExists(data.hourly, selectedDay)} />
                    </div>

                </div>

            }
        </>
    );
}