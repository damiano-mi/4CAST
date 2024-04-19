import TemperatureRoughList from "./hourlyWeatherData/TemperatureRoughList"
import WeatherConditionSelector from "../buttons/WeatherConditionSelector"
import TemperatureList from "./hourlyWeatherData/TemperatureList"
import CloudinessList from "./hourlyWeatherData/CloudinessList"
import RainfallList from "./hourlyWeatherData/RainfallList"
import SunriseList from "./hourlyWeatherData/SunMoonList"
import WindList from "./hourlyWeatherData/WindList"
import UviList from "./hourlyWeatherData/UviList"
import * as Icon from "react-bootstrap-icons"
import { RootState } from "../../state/store"
import { useSelector } from "react-redux"
import "bootstrap/dist/js/bootstrap.js"
import { useState } from "react"

type HourlyWeatherLayoutProps = {
    precise: boolean
}

const HourlyWeatherLayout: React.FC<HourlyWeatherLayoutProps> = ({ precise }: HourlyWeatherLayoutProps) => {

    const [toggleTable, setToggleTable] = useState<boolean>(false);

    const selectedParameter = useSelector((state: RootState) => state.weather.selectedParameter);

    return (
        <>
            <div className="collapse" id="collapseHourly">
                <WeatherConditionSelector shortView={!precise} />
                <div className="card-group card-group-scroll mb-2" id="hourly">
                    {(() => {
                        switch (selectedParameter) {
                            case "temperature": return precise ? <TemperatureList /> : <TemperatureRoughList />;

                            case "wind": return <WindList />;

                            case "rainfall": return <RainfallList />;

                            case "uvi": return <UviList />;

                            case "cloudiness": return <CloudinessList />;

                            case "sunrise": return <SunriseList />;

                            default: return null;
                        }
                    })()}
                </div>
            </div>

            { /* Hide button */}
            <button id="hideButton" onClick={() => setToggleTable(t => !t)} type="button" data-bs-toggle="collapse" data-bs-target="#collapseHourly" aria-expanded="false" aria-controls="collapseHourly">
                {!toggleTable ?
                    <p className="m-auto fs-6"><Icon.ChevronDown size={35} /></p> :
                    <p className="m-auto fs-6"><Icon.ChevronUp size={35} /></p>
                }
            </button>
        </>
    );
}

export default HourlyWeatherLayout;