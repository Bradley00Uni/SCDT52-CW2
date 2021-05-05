import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormControl, Container, Table, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../../Components/Loader'
import ErrorMessage from '../../Components/ErrorMessage'

import ReviewFormContainer from '../../Components/ReviewFormContainer'
import {listGallery, galleryCreate, galleryDelete} from '../../actions/galleryActions'

const ManageGalleryScreen = ({history}) => {

    const [caption, setCaption] = useState('')
    const [imageURL, setImageURL] = useState('')

    const [message, setMessage] = useState('')
    const [success, setSuccess] = useState('')
    const [deleteSuccess, setDeleteSuccess] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {error} = userDetails
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const galleryList = useSelector(state => state.galleryList) 
    const {loading, exampleCuts} = galleryList

    const createNewEntry = useSelector(state => state.galleryCreate)
    const {createError, newCut} = createNewEntry

    const deleteAnEntry = useSelector(state => state.galleryDelete)
    const {deleteError, deletedCut} = deleteAnEntry

    useEffect(()=>{
        if(!userInfo || userInfo.length < 1 || !userInfo.isAdmin || error){
            history.push('/')
            alert('Unauthorised Access');
        }
        dispatch(listGallery())
    },[dispatch, history])

    const submitHandler = (e) => {
        console.log(caption, imageURL)

        if(imageURL.includes('images/cuts/')){
            dispatch(galleryCreate(caption, imageURL))

            if(newCut){
                setMessage('')
                setSuccess('Gallery Object Created')
            }
            else{
                setSuccess('')
                setMessage(createError)
            }
        }
        else{
            setMessage('Please Enter a Valid Image URL')
            setSuccess('')
        }
    }

    const DeleteEntry = (entry) => {
        console.log(entry)
        dispatch(galleryDelete(entry))
        
        if(deletedCut){
            setMessage('')
            setSuccess('')
            setDeleteSuccess('Gallery Object Deleted')
            dispatch(listGallery())
        }
        else{
            setMessage(deleteError)
            setDeleteSuccess('')
        }
    }

    return (
        <div>
            <Container>
                <ReviewFormContainer>
                    <Form onSubmit={submitHandler} className='gallery-form'>
                        <h1 className='header-text'>CREATE A NEW GALLERY IMAGE</h1>
                        {success && <ErrorMessage variant ='success'>{success}</ErrorMessage>}
                        {message && <ErrorMessage variant='danger'>{message}</ErrorMessage> }
                        <Row className='gallery-form-row'>
                            <Col sm={6} md={6} lg={2}>
                                <h4>Caption</h4>
                            </Col>
                            <Col sm={6} md={6} lg={4}>
                                <FormControl
                                placeholder='Image Caption'
                                maxLength='40'
                                onChange={(e)=>setCaption(e.target.value)}
                                ></FormControl>
                            </Col>
                            <Col sm={6} md={6} lg={4}>
                                <FormControl
                                placeholder='images/cuts/(ImageURL)'
                                onChange={(e)=>setImageURL(e.target.value)}
                                ></FormControl>
                            </Col>
                            <Col sm={6} md={6} lg={2}>
                                <h4>Image URL</h4>
                            </Col>
                        </Row>
                        <Row className='gallery-form-row'>
                            <Col md={1} lg={2}></Col>
                            <Col sm={12} md={10} lg={8}>
                                    <Button
                                    onClick={submitHandler}
                                    size='lg'
                                    className='btn btn-block rounded btn-success'
                                    >Create Upload
                                    </Button>   
                            </Col>
                            <Col md={1} lg={2}></Col>
                        </Row>
                        <p><i>Images will need to already be within the 'images/cuts' folder</i></p>
                    </Form>
                </ReviewFormContainer>
            </Container>

            <Container>
                <h1 className='header-text'>ALL GALLERY IMAGES</h1>
                {loading && <Loader />}
                {deleteSuccess && <ErrorMessage variant ='warning'>{deleteSuccess}</ErrorMessage>}
                <Col sm={12} md={12} lg={12}>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead className='table-head'>
                            <tr>
                                <th>ID</th>
                                <th>Caption</th>
                                <th>Image Source</th>
                                <th>Uploaded</th>
                                <th>Delete?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exampleCuts.map((entry)=>(
                                <tr key={entry._id}>
                                    <td>{entry._id.slice(-8)}</td>
                                    <td>{entry.description}</td>
                                    <td>{entry.imageURL}</td>
                                    {entry.uploadDate ? (
                                        <td>{entry.uploadDate.slice(0,10)}</td>
                                    ):(
                                        <td>{entry.createdAt.slice(0,10)}</td>
                                    )}
                                    <td><Button onClick={()=>DeleteEntry(entry)} className='btn btn-block btn-danger'>Delete</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Container>
        </div>
    )
}

export default ManageGalleryScreen
