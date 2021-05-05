import React from 'react'
import { Alert } from 'react-bootstrap'

//ERROR MESSAGE USED WHEN FUNCTION FAILS
const ErrorMessage = ({ variant, children }) => {
    return (
        <Alert variant={variant}>
            {children}
        </Alert>
    )
}

ErrorMessage.defaultProps = {
    variant: 'info'
}

export default ErrorMessage
