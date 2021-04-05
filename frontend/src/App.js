import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Container} from 'react-bootstrap';

import LandingScreen from './Screens/LandingScreen'
import ReviewScreen from './Screens/ReviewScreen'
import GalleryScreen from './Screens/GalleryScreen'
import {BrowserRouter as Router, Route} from 'react-router-dom' 

import Header from './Components/Header';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="App">
       <Router>
      <Header/>
        <Container>
          <Route path='/' component={LandingScreen} exact/>

          
          <Route path='/reviews' component={ReviewScreen} exact/>
          <Route path='/gallery' component={GalleryScreen} exact/>

          
        </Container>
      <Footer/>
    </Router>
    </div>
  );
}

export default App;
