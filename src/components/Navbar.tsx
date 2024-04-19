import SearchBar from "./SearchBar"
import { SvgIcon } from "./SvgIcon"
import "../assets/styles/navbar.css"
import * as Icon from "react-bootstrap-icons"

export default function Navbar() {

    return (
        <nav className="navbar navbar-expand-sm" id="navbar">
            <div className="container-fluid">
                <a className="navbar-brand mt-1" href="/">
                    <SvgIcon name={"logo1"} alt={"4CAST logo"} style={{ height: 38, margin: "auto" }} />
                </a>
                <button
                    className="navbar-toggler searchButton"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <Icon.Search size={23} />
                </button>
                <div className="collapse navbar-collapse flex-row-reverse" id="navbarSupportedContent">
                    <SearchBar />
                </div>
            </div>
        </nav>

    );
}