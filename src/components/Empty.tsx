import React from "react";
import "../layout/EmptyRequests.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const Empty:React.FC<{ message: String }> = ({ message }) =>{
    return (
        <div className="empty">
            <FontAwesomeIcon icon={faTimesCircle} size="7x" />
            <h4 className="empty-text mt-3">
                {message}
            </h4>
        </div>
    )
}

export default Empty;
