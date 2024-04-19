import * as Icon from "react-bootstrap-icons"
import { RootState } from "../../state/store"
import { useSelector } from "react-redux"
import "../../assets/styles/buttons.css"
import "../../assets/styles/alerts.css"
import AlertsData from "./AlertsData"
import { useState } from "react"

export default function AlertsDisplay() {

    const city = useSelector((state: RootState) => state.city.city);
    const weatherData = useSelector((state: RootState) => state.weather.weather);
    const [toggleTable, setToggleTable] = useState<boolean>(false);
    const isLoading = useSelector((state: RootState) => state.weather.isLoading);

    return (
        <div className="card text-white bg-danger bg-opacity-25 bg-gradient border-0 shadow rounded-5" style={{ minHeight: 190 }} id="alertsBox">

            {/* Title */}
            <div className="row mb-2">
                <div className="col"><p className="fs-2 fw-bold text-center mt-1 my-auto"><Icon.ExclamationTriangleFill size={25} className="mb-2" /> Alerts in {city.name}</p></div>
            </div>

            {/* Alerts list */}
            {!isLoading && weatherData &&
                weatherData.alerts ?
                <div id="alerts">
                    {/* First alert, always visible */}
                    <div>
                        <AlertsData alert={weatherData.alerts[0]} idAlert={0} />
                    </div>
                    {/* Other alerts, collapsed */}
                    <div className="collapse" id="collapseAlerts">
                        {weatherData.alerts.slice(1).map((alert, id) =>
                            <AlertsData alert={alert} key={id + 1} idAlert={id + 1} />)}
                    </div>
                </div>
                :
                <div className="row m-auto">
                    <div className="col my-auto text-center">
                        <p className="fs-4 my-auto">No national weather alerts found</p>
                    </div>
                </div>
            }
            <div className="row">
                <div className="col text-center mb-1 mt-2">
                    {weatherData && weatherData.alerts
                        ?
                        weatherData.alerts.length === 1
                            ?
                            <p className="m-auto fs-6"><Icon.DashLg size={35} /></p>
                            :
                            !toggleTable
                                ?
                                <button id="hideButton" onClick={() => setToggleTable(true)} type="button" data-bs-toggle="collapse" data-bs-target="#collapseAlerts" aria-expanded="false" aria-controls="collapseAlerts">
                                    <p className="m-auto fs-6"><Icon.ChevronDown size={35} /></p>
                                </button>
                                :
                                <button id="hideButton" onClick={() => setToggleTable(false)} type="button" data-bs-toggle="collapse" data-bs-target="#collapseAlerts" aria-expanded="false" aria-controls="collapseAlerts">
                                    <p className="m-auto fs-6"><Icon.ChevronUp size={35} /></p>
                                </button>
                        :
                        <p className="m-auto fs-6"><Icon.DashLg size={35} /></p>
                    }
                </div>
            </div>
        </div>
    );
}