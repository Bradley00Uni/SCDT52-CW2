import React from 'react'
import { Container, Card } from 'react-bootstrap'

//FORMAT DAILY MESSAGE DISPLAY TO ALL USERS
const DailyMessage = ({dailyMessage}) => {



    return(

        <div class="alert alert-danger" role="alert">
            <strong>UPDATE {dailyMessage.createdAt.slice(0,10)}</strong> : {dailyMessage.message}
        </div>
       
    )
}

export default DailyMessage