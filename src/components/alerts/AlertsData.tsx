import { timeIntervalFormat } from "../../utilities/StringFormat"
import * as Icon from "react-bootstrap-icons"
import { Alert } from "../../types/types"
import AlertsModal from "./AlertsModal"

type AlertsDataProps = {
    alert: Alert,
    idAlert: number
}

const AlertsData: React.FC<AlertsDataProps> = ({ alert, idAlert }: AlertsDataProps) => {

    return (
        <>
            <a data-bs-toggle="modal" data-bs-target={"#alertModal" + idAlert} href="#alerts" className="text-white">
                <div className="row m-auto fw-light" id="alertsLine">
                    <div id="alerts">
                        {/* General data */}
                        <div className="col-md-auto my-auto">
                            <div className="text-white ">
                                <div className="fs-4 my-auto text-center" id="alertsData">
                                    <div id="alertsIcon" className="m-auto"><Icon.CalendarEventFill size={20} /></div>
                                    <div className="m-auto"></div>{timeIntervalFormat(alert.start, alert.end)[0]}
                                </div>
                            </div>
                        </div>
                        {/* Start - end time */}
                        <div className="col-md-auto fs-5 my-auto">
                            <div className="row m-auto">
                                <div className="text-white">
                                    <p className="my-auto"><Icon.Clock className="mb-1 me-1" /> {timeIntervalFormat(alert.start, alert.end)[1]}</p>
                                </div>
                            </div>
                            <div className="row m-auto ">
                                <div className="text-white">
                                    <p className="my-auto"><Icon.ClockFill className="mb-1 me-1" /> {timeIntervalFormat(alert.start, alert.end)[2]}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="alertsText">
                        {/* Event title */}
                        <div className="col my-auto text-center">
                            <p className="fs-4 my-auto">{alert.event}</p>
                        </div>
                    </div>
                </div>
                <hr className="my-2" />
            </a>
            <AlertsModal alert={alert} idAlert={idAlert} />
        </>
    );
}

export default AlertsData;