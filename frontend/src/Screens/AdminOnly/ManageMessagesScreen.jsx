import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormControl, Container, Table, Collapse } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import {listMessages, createDailyMessage, deleteDailyMessage} from '../../actions/dailyMessageActions'

import Loader from '../../Components/Loader'
import ErrorMessage from '../../Components/ErrorMessage'
import ReviewFormContainer from '../../Components/ReviewFormContainer'

const ManageMessagesScreen = ({history}) => {

    const [newDailyMessage, setNewDailyMessage] = useState('')

    const [message, setMessage] = useState('')
    const [success, setSuccess] = useState('')
    const [deleteSuccess, setDeleteSuccess] = useState('')
    const [formShow, setFormShow] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {error} = userDetails
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const newMessage = useSelector(state => state.dailyMessages)
    const {messageLoading, messageError, dailyMessages} = newMessage

    const deleteMessage= useSelector(state => state.deleteDailyMessage)
    const {foundMessage} = deleteMessage

    const createMessage  =useSelector(state => state.createDailyMessage)
    const {createLoading, createError, dailyMessage} = createMessage

    useEffect(()=>{
        if(!userInfo || userInfo.length < 1 || !userInfo.isAdmin || error){
            history.push('/')
            alert('Unauthorised Access')
        }
        dispatch(listMessages())
        setFormShow(true)
    },[dispatch, history])

    const submitHandler = (e) => {
        console.log(newDailyMessage)
        dispatch(createDailyMessage(newDailyMessage))
        
        if(dailyMessage){
            setMessage('')
            setSuccess('Daily Message Created')
            dispatch(listMessages())
            setFormShow(false)
        }
    }

    const DeleteDailyMessage = (message) => {
        console.log(message)
        dispatch(deleteDailyMessage(message))

        if(foundMessage){
            setMessage('')
            setSuccess('')
            setDeleteSuccess('Message Deleted')
            dispatch(listMessages())
        }
        else{
            setMessage(createError)
        }
        
    }


    return (
        <div>
            <Container>
                <ReviewFormContainer>
                {success && <ErrorMessage variant ='success'>{success}</ErrorMessage>}
                    <Collapse in={formShow}>
                       <Form onSubmit={submitHandler} className='message-form'>
                        <h1 className='header-text'>SET A NEW MESSAGE</h1>
                        {message && <ErrorMessage variant='danger'>{message}</ErrorMessage> }
                        {createLoading && <Loader />}
                        <Row>
                            <Col sm={12} md={12} lg={12}>
                                <FormControl
                                placeholder='Message Body (120 Character Max)'
                                maxLength='120'
                                as='textarea'
                                rows={3}
                                onChange={(e)=>setNewDailyMessage(e.target.value)}
                                ></FormControl>
                            </Col>
                        </Row>
                        <Row className='message-form-row'>
                            <Col sm={12} md={12} lg={12}>
                                <Button
                                onClick={submitHandler}
                                size='lg'
                                className='btn btn-block rounded btn-success'
                                >Submit
                                </Button>   
                            </Col>   
                        </Row>
                       </Form>
                    </Collapse>
                </ReviewFormContainer>
            </Container>
            <Container>
                <h1 className='header-text'>ALL DAILY MESSAGES</h1>
                {messageLoading && <Loader />}
                {messageError && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                {deleteSuccess && <ErrorMessage variant ='warning'>{deleteSuccess}</ErrorMessage>}
                <Col sm={12} md={12} lg={12}>
                    <p><i>The latest Daily Message will always be displayed, if you want no message at all - make sure this table is empty!</i></p>
                    <Table striped bordered hover responsie className='table-sm'>
                        <thead className='table-head'>
                            <tr>
                                <th>Date</th>
                                <th>Message</th>
                                <th>Delete?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dailyMessages.map((message)=>(
                                <tr key={message._id}>
                                    <td>{message.createdAt.slice(0,10)}</td>
                                    <td>{message.message}</td>
                                    <td><Button onClick={()=>DeleteDailyMessage(message)} className='btn btn-block btn-danger'>Delete</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Container>
        </div>
    )
}

export default ManageMessagesScreen
