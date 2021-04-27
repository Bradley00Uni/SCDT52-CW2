import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormControl, Container, Table, Dropdown, DropdownButton } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import {allUsers, deleteUser} from '../../actions/userActions'

import Loader from '../../Components/Loader'
import ErrorMessage from '../../Components/ErrorMessage'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'

const ManageUsersScreen = ({history}) => {

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const listAllUsers = useSelector(state => state.allUsers)
    const {usersLoading, usersError, users} = listAllUsers
    
    const deletedUser = useSelector(state => state.deleteAUser)
    const {accountDelete} = deletedUser

    useEffect(()=>{
        if(!userInfo || userInfo.length < 1 || !userInfo.isAdmin || error){
            history.push('/')
            alert('Unauthorised Access');
        }

        dispatch(allUsers())
    }, [dispatch])

    const ContactUser = (user, method) => {
        const email = user.email

        if(method == 'email'){
            window.open(`mailto:${email}?subject=Kaye_the_Barber: Contact Request`)
        }
    }

    const DeleteUser = (user) => {
        dispatch(deleteUser(user))
        window.location.reload()
    }
    
    return (
        <div>
            <Container>
                <h1 className='header-text'>USER MANAGEMENT</h1>
                {usersLoading && <Loader />}
                {usersError && <ErrorMessage variant='danger'>{error}</ErrorMessage>}

                <Col sm={12} md={12} lg={12}>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead className='table-head'>
                            <tr>
                                <th>User</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Admin?</th>
                                <th>Member Since</th>
                                <th>Contact</th>
                                <th>Delete?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((account)=>(
                                <tr key={account._id}>

                                    <td>{account._id.slice(-10)}</td>
                                    <td>{account.name}</td>
                                    <td>{account.email}</td>
                                    <td>{account.phone}</td>
                                    <td>{account.isAdmin ? <p>Yes</p> : <p>No</p>}</td>
                                    <td>{account.createdAt.slice(0,10)}</td>
                                    <td><DropdownButton variant='info' title='Contact'><Dropdown.Item onClick={()=>ContactUser(account, 'email')}>Email</Dropdown.Item></DropdownButton></td>
                                    <td><Button onClick={()=>DeleteUser(account)} className='btn btn-block btn-danger'>Delete</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Container>
        </div>
    )
}

export default ManageUsersScreen
