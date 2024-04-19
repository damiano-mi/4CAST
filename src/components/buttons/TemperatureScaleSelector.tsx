import { TemperatureScale, setTemperature } from "../../state/temperature/temperatureSlice"
import { AppDispatch } from "../../state/store"
import { useDispatch } from "react-redux"
import "../../assets/styles/buttons.css"
import { useState } from "react"

export default function TemperatureScaleSelector() {

    const dispatch = useDispatch<AppDispatch>();
    const [temperatureUnit, setTemperatureUnit] = useState<TemperatureScale>("C");

    function switchTemperatureUnit() {
        switch (temperatureUnit) {
            case "C":
                setTemperatureUnit("F");
                dispatch(setTemperature("F"));
                break;
            case "F":
                setTemperatureUnit("K");
                dispatch(setTemperature("K"));
                break;
            case "K":
                setTemperatureUnit("C");
                dispatch(setTemperature("C"));
                break;
            default:
                break;
        }
    };

    return (
        <button className="tempSelector" onClick={switchTemperatureUnit}>{temperatureUnit}</button>
    );
}