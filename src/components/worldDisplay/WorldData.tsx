import { useSelector } from "react-redux";
import { weatherAPI } from "../../services/weatherAPI"
import { RootState } from "../../state/store";
import { temperatureConverter } from "../../utilities/WeatherCalculator";
import { SvgIcon } from "../SvgIcon";
import { useGetCityQuery } from "../../services/citiesAPI";
import { setCity } from "../../state/city/citySlice"
import { useDispatch} from "react-redux"
import { AppDispatch } from "../../state/store"

type WorldDataProps = {
    city: string;
}

const WorldData: React.FC<WorldDataProps> = ({ city }: WorldDataProps) => {

    const dispatch = useDispatch<AppDispatch>();
    const useGetWeatherQuery = weatherAPI.endpoints.getWeather.useQuery;
    const { data: cityData, isLoading: isLoadingCity } = useGetCityQuery(city);
    const { data: weatherData, isLoading: isLoadingWeather } = useGetWeatherQuery(!isLoadingCity ? { lat: cityData![0].lat, lon: cityData![0].lon } : { lat: 0, lon: 0 });

    const selectedTemp = useSelector((state: RootState) => state.temperature.temperature);

    function handleCity(){
        dispatch(setCity(cityData![0]))
    }

    return (<>
        {!isLoadingWeather && !isLoadingCity && weatherData && cityData &&
            <a id="worldLine" onClick={handleCity} href="#navbar" className="text-white">
                <div className="row">
                    <p className="col m-auto">{weatherData && <SvgIcon name={weatherData.current.weather[0].icon} alt={weatherData.current.weather[0].main} style={{}} />}</p>
                    <p className="col m-auto fs-4">{cityData![0].name}</p>
                    <p className="col m-auto fs-5">{weatherData && temperatureConverter(weatherData.current.temp, selectedTemp)}</p>
                </div>
            </a>
        }
    </>);
}

export default WorldData;