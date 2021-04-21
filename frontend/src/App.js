import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Container} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'

import {BrowserRouter as Router, Route} from 'react-router-dom' 

import LandingScreen from './Screens/LandingScreen'
import ReviewScreen from './Screens/ReviewScreen'
import GalleryScreen from './Screens/GalleryScreen'
import ContactScreen from './Screens/ContactScreen'
import AccountScreen from './Screens/AccountScreen'
import AppointmentScreen from './Screens/AppointmentScreen'

import ManageAppointmentsScreen from './Screens/AdminOnly/ManageAppointmentsScreen'
import ManageServicesScreen from './Screens/AdminOnly/ManageServicesScreen'
import ManageUsersScreen from './Screens/AdminOnly/ManageUsersScreen'
import ManageMessagesScreen from './Screens/AdminOnly/ManageMessagesScreen'

import LoginScreen from './Screens/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen'

import Header from './Components/Header'
import Footer from './Components/Footer'
import AdminHeader from './Components/AdminHeader'

function App() {

  
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  return (
    <div className="App">
       <Router> 
        {userInfo && userInfo.isAdmin ? (
          <AdminHeader/>
        ):(
          <Header/>
        )}
        <Container>

          <Route path='/' component={LandingScreen} exact/>
          <Route path='/reviews' component={ReviewScreen} exact/>
          <Route path='/appointment' component={AppointmentScreen} exact/>
          <Route path='/gallery' component={GalleryScreen} exact/>
          <Route path='/contact' component={ContactScreen} exact/>

          <Route path='/login' component={LoginScreen} exact/>
          <Route path='/register' component={RegisterScreen} exact/>
          <Route path='/account' component={AccountScreen} exact/>

          <Route path='/admin/appointments' component={ManageAppointmentsScreen} exact/>
          <Route path='/admin/services' component={ManageServicesScreen} exact/>
          <Route path='/admin/users' component={ManageUsersScreen} exact/>
          <Route path='/admin/messages' component={ManageMessagesScreen} exact/>
          
        </Container>
      <Footer/>
    </Router>
    </div>
  );
}

export default App;
