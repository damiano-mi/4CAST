import { unixAllInfoConverter, unixWeekNameConverter } from "../../utilities/TimeConverter"
import * as Icon from "react-bootstrap-icons"
import { Alert } from "../../types/types"

type AlertsModalProps = {
    alert: Alert,
    idAlert: number
}

const AlertsModal: React.FC<AlertsModalProps> = ({ alert, idAlert }: AlertsModalProps) => {
    
    return (
        <div
            className="modal fade text-black no-shadow"
            id={"alertModal"+idAlert}
            tabIndex={-1}
            aria-labelledby="alertModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered modal-lg " role="document">
                <div className="modal-content ">
                    <div className="modal-header bg-warning">
                        <p className="modal-title fs-3" id="alertModalLabel">
                            <Icon.ExclamationTriangleFill size={22} className="mb-1 me-1" /> {alert.event}
                        </p>
                        <button
                            type="button"
                            className="btn-close me-1"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        />
                    </div>
                    <div className="modal-body">
                        <div className="row fs-5">
                            <div className="col-md-auto">Start: {unixWeekNameConverter(alert.start) + " " + unixAllInfoConverter(alert.start)}</div>
                            <div className="col-md-auto">End: {unixWeekNameConverter(alert.end) + " " + unixAllInfoConverter(alert.end)}</div>
                        </div>
                        <hr className="my-2"/>
                        <div className="row mt-1">
                            <p className="fs-4 m-auto regular-text">{alert.description}</p>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <p className="light-text">Provided by:  {alert.sender_name}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AlertsModal;