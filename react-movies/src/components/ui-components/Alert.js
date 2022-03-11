import React from 'react';

function Alert(props) {
    return (
        <div className={`alert ${props.alertType}`} role="alert">
            {props.alertMessage}
        </div>
    );
}

export default Alert;
