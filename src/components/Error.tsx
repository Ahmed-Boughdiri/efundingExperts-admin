import React from "react";
import "../layout/Error.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

const Error:React.FC<{ error: String }> = ({ error }) =>{
    return (
        <div className="error">
            <FontAwesomeIcon icon={faExclamationCircle} size="7x" />
            <h3 className="error-text mt-4">{error}</h3>
        </div>
    )
}

export default Error;
