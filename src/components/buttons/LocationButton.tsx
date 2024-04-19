import { setCity, setCoords, citySelector } from "../../state/city/citySlice"
import { useDispatch, useSelector } from "react-redux"
import { citiesAPI } from "../../services/citiesAPI"
import { AppDispatch } from "../../state/store"
import * as Icon from "react-bootstrap-icons"
import "../../assets/styles/buttons.css"
import { useEffect } from "react"

export default function LocationButton() {

    const city = useSelector(citySelector);
    const dispatch = useDispatch<AppDispatch>();
    const useGetCityByCoordsQuery = citiesAPI.endpoints.getCityByCoords.useQuery;
    const { data } = useGetCityByCoordsQuery({ lat: city.lat, lon: city.lon });

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("Geolocation is not active");
        }
    }

    function showPosition(position: any) {
        dispatch(setCoords({ lat: position.coords.latitude, lon: position.coords.longitude }));
    }

    useEffect(() => {
        if (data) {
            dispatch(setCity(data![0]));
        }
    }, [data, dispatch])

    return (
        <button className="positionButton" onClick={getLocation}><Icon.PinMapFill size={20} /></button>
    );
}