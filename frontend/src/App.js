import React, { Component } from 'react'
import { HashRouter as Router, Route } from "react-router-dom"
import FrontPage from "./pages/FrontPage"
import LocationPage from "./pages/LocationPage"
import StarsPage from "./pages/StarsPage"
import Footer from "./components/Footer"
import './App.css'

class App extends Component {

  state = {
    isLoggedIn: false,
    collectedStars: [],
    lng: 18.063240,
    lat: 59.334591
  }

  componentDidMount() {
    if (!this.state.isLoggedIn) {
      sessionStorage.removeItem("accessToken")
    }
  }

  updateCoords = (newLat, newLng) => {
    this.setState({
      lat: newLat,
      lng: newLng
    })
  }

  checkLogInStatus = (isLoggedIn, collectedStars) => {
    this.setState({
      isLoggedIn,
      collectedStars
    })
  }

  render() {
    const { lat,  lng, collectedStars, isLoggedIn } = this.state

    return (
      <Router>
        <div>
          <Route exact path="/" render={(props) => <FrontPage {...props}
            onLogin={this.checkLogInStatus} />}
            />
          <Route exact path="/location" render={(props) => <LocationPage {...props}
            lat={lat}
            lng={lng}
            updateCoords={this.updateCoords} />}
          />
          <Route exact path="/stars" render={(props) => <StarsPage {...props}
            lat={lat}
            lng={lng}
            collectedStars={collectedStars}
            isLoggedIn={isLoggedIn} />}
          />
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App
