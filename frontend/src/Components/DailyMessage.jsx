import React from 'react'
import { Container, Card } from 'react-bootstrap'

const DailyMessage = ({dailyMessage}) => {


    var dateString = dailyMessage.uploadedAt.toString()
    var dateFormat = dateString.substring(0,10)

    return(

        <div class="alert alert-danger" role="alert">
            <strong>UPDATE {dateFormat}</strong> : {dailyMessage.message}
        </div>
       
    )
}

export default DailyMessage