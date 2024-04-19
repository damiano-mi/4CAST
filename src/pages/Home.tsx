import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"
import MainWeatherLayout from "../components/mainDisplay/MainWeatherLayout";
import ForecastList from "../components/forecast/ForecastList";
import AlertsLayout from "../components/alerts/AlertsLayout";
import WorldLayout from "../components/worldDisplay/WorldLayout";
import Footer from "../components/Footer";
import "../assets/styles/general.css"
import WeatherMap from "../components/WeatherMap";

export default function Home() {

    return (

        <div className="col">
            <div className="row">
                <MainWeatherLayout />
            </div>
            <div className="row mt-4">
                <ForecastList />
            </div>
            <div className="row mt-3">
                <div className="col"><WeatherMap /></div>
                <div className="col"><WorldLayout /></div>
            </div>
            <div className="row mt-2">
                <AlertsLayout />
            </div>
            <div className="row mt-4">
            </div>
            <Footer />
        </div>
    );
}