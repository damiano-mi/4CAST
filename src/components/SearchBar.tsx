import { cityNameFormat } from "../utilities/StringFormat"
import { citiesAPI } from "../services/citiesAPI"
import { setCity } from "../state/city/citySlice"
import { AppDispatch } from "../state/store"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import Flag from "react-world-flags"
import "../assets/styles/navbar.css"

export default function SearchBar() {

    const useGetCityQuery = citiesAPI.endpoints.getCity.useQuery;
    const [input, setInput] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();
    const { data } = useGetCityQuery(input, { skip: input.length < 3 });

    const [showResults, setShowResults] = useState<boolean>(false);

    function searchCity(id: number) {
        dispatch(setCity(data![id]));
        setInput("");
    }

    function handleCity(e: any) {
        setInput(e.target.value);
        setShowResults(true);
    }

    useEffect(() => {

        const closeResults = (e : any) => {
            if(e.target.name !== "input"){
                setShowResults(false);
            }
            
        }
        document.body.addEventListener("click", closeResults);

        return () => document.body.removeEventListener("click", closeResults);
    })

    return (
        <form className="form-inline d-flex justify-content-center mt-2 mb-1" autoComplete="off" onSubmit={(e) => e.preventDefault()}>
            <div className="row align-items-center">
                <div className="col-md-auto">
                    <input
                        className="searchBar"
                        id="input"
                        type="text"
                        name="input"
                        value={input}
                        onChange={handleCity}
                        onClick={() => setShowResults(true)}
                        placeholder="Search a city"
                        aria-label="Search"
                    />
                </div>
            </div>
            <div className="searchResults">
                {showResults && input.length >= 3 && input && data && data.map((city, id) => {
                    return <p className="dataItem my-auto" key={id} onClick={() => searchCity(id)}>
                        <Flag code={city.country} height="12" className="me-2" />
                        {cityNameFormat(city.name, city.state)}
                    </p>;
                })}
            </div>
        </form>
    );
}