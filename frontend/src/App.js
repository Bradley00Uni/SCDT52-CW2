import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Container} from 'react-bootstrap';

import {BrowserRouter as Router, Route} from 'react-router-dom' 

import LandingScreen from './Screens/LandingScreen'
import ReviewScreen from './Screens/ReviewScreen'
import GalleryScreen from './Screens/GalleryScreen'
import ContactScreen from './Screens/ContactScreen'
import AccountScreen from './Screens/AccountScreen'
import AppointmentScreen from './Screens/AppointmentScreen'

import LoginScreen from './Screens/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen'

import Header from './Components/Header'
import Footer from './Components/Footer'

function App() {
  return (
    <div className="App">
       <Router>         
      <Header/>
        <Container>

          <Route path='/' component={LandingScreen} exact/>
          <Route path='/reviews' component={ReviewScreen} exact/>
          <Route path='/appointment' component={AppointmentScreen} exact/>
          <Route path='/gallery' component={GalleryScreen} exact/>
          <Route path='/contact' component={ContactScreen} exact/>

          <Route path='/login' component={LoginScreen} exact/>
          <Route path='/register' component={RegisterScreen} exact/>
          <Route path='/account' component={AccountScreen} exact/>
          
        </Container>
      <Footer/>
    </Router>
    </div>
  );
}

export default App;
