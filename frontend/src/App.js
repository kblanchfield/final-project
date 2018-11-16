import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import FrontPage from "./pages/FrontPage"
import LocationPage from "./pages/LocationPage"
import StarsPage from "./pages/StarsPage"
import MapPage from "./pages/MapPage"
import Footer from "./components/Footer"
import './App.css'

class App extends Component {

  state = {
    lat: 0,
    lng: 0
  }

  updateCoords = (newLat, newLng) => {
    this.setState({
      lat: newLat,
      lng: newLng
    })
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={FrontPage} />
          <Route exact path="/location" render={(props) => <LocationPage {...props}
            updateCoords={this.updateCoords} />}
          />
          <Route exact path="/stars" render={(props) => <StarsPage {...props}
            lat={this.state.lat}
            lng={this.state.lng} />}
          />
          <Route exact path="/map" component={MapPage} />
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App
