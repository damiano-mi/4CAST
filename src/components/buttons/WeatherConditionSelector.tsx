import { WeatherConditionParameter, setParameter } from "../../state/weather/weatherSlice"
import { AppDispatch } from "../../state/store"
import { useDispatch } from "react-redux"

type WeatherConditionSelectorProps = {
    shortView: boolean;
}

const WeatherConditionSelector: React.FC<WeatherConditionSelectorProps> = ({ shortView }: WeatherConditionSelectorProps) => {

    const dispatch = useDispatch<AppDispatch>();

    const handleButton = (paremeter: WeatherConditionParameter) => {
        dispatch(setParameter(paremeter));
    }

    return (
        <div className="flex-wrap mt-3 mb-2 no-shadow" role="group" aria-label="Weather condition selector" >
            <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" onClick={() => handleButton("temperature")} defaultChecked={true} />
            <label className="btn btn-outline-light me-2 mb-2" htmlFor="btnradio1">Temperature</label>
            {!shortView ?
                (<>
                    <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" onClick={() => handleButton("rainfall")} />
                    <label className="btn btn-outline-light me-2 mb-2" htmlFor="btnradio2">Rainfall</label>

                    <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" onClick={() => handleButton("wind")} />
                    <label className="btn btn-outline-light me-2 mb-2" htmlFor="btnradio3">Wind</label>

                    <input type="radio" className="btn-check" name="btnradio" id="btnradio4" autoComplete="off" onClick={() => handleButton("uvi")} />
                    <label className="btn btn-outline-light me-2 mb-2" htmlFor="btnradio4">UV index</label>

                    <input type="radio" className="btn-check" name="btnradio" id="btnradio5" autoComplete="off" onClick={() => handleButton("cloudiness")} />
                    <label className="btn btn-outline-light me-2 mb-2" htmlFor="btnradio5">Cloudiness</label>
                </>)
                :
                ""
            }
            <input type="radio" className="btn-check" name="btnradio" id="btnradio6" autoComplete="off" onClick={() => handleButton("sunrise")} />
            <label className="btn btn-outline-light mb-2" htmlFor="btnradio6">Sun/moon</label>
        </div>
    );
}

export default WeatherConditionSelector;