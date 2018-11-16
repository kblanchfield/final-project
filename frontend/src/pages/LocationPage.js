import React, { Component } from "react"
import PropTypes from "prop-types"
import Location from "../components/Location"
import Chart from "../components/Chart"
import Map from "../components/Map"
import Next from "../components/Next"

class LocationPage extends Component {

  state = {
    lat: 59.334591,
    lng: 18.063240,
    weatherMessage: "",
    midnightCloudCover: []
  }

  updateCoords = (newLat, newLng) => {
    this.setState({
      lat: newLat,
      lng: newLng
    }, () => this.props.updateCoords(this.state.lat, this.state.lng))
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.lat !== this.state.lat) {
      this.getWeather()
    }
  }

  getWeather = () => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${this.state.lat}&lon=${this.state.lng}&APPID=ee4066bbc82305811aecd61e6c30d861`)
      .then(response =>
      response.json())
      .then(json => {
        if(json.list !== undefined) {
          const midnightCloudCover = json.list.filter(time => /00:00:00/.test(time.dt_txt)).map(day => day.clouds.all)
          this.setState({
            midnightCloudCover
          })
          console.log(midnightCloudCover)
        }
      })
      .then(() => {
        let weatherMessage = ""
        if (this.state.midnightCloudCover[0] < 50) {
          weatherMessage = `Good news! Looks like it will be a clear sky at midnight tonight - perfect for seeing the stars.`
        } else if (this.state.midnightCloudCover[1] < 50) {
          weatherMessage = `There's a ${this.state.midnightCloudCover[0]}% chance of clouds tonight. It looks like it will be a clearer sky tomorrow night.`
        } else if (this.state.midnightCloudCover[2] < 50) {
          weatherMessage = `There's a ${this.state.midnightCloudCover[0]}% chance of clouds tonight. It looks like it will be a clearer sky in 2 nights.`
        } else if (this.state.midnightCloudCover[3] < 50) {
          weatherMessage = `There's a ${this.state.midnightCloudCover[0]}% chance of clouds tonight. It looks like it will be a clearer sky in 3 nights.`
        } else if (this.state.midnightCloudCover[4] < 50) {
          weatherMessage = `There's a ${this.state.midnightCloudCover[0]}% chance of clouds tonight. It looks like it will be a clearer sky in 4 nights.`
        } else {
          weatherMessage = `Looks like it wll be cloudy for the next 5 nights. Netflix?`
        }
        this.setState({
          weatherMessage
        })
      })
      .catch(err => console.log("err:", err))
  }


  render() {

    return (
      <div className="page">
        <div className="left">
          <div className="locationData">
            <Location
              lat={this.state.lat}
              lng={this.state.lng}
              weatherMessage={this.state.weatherMessage}
             />
            <Chart data={this.state.midnightCloudCover}/>
            <Next link="/stars" text="Go to stars" />
          </div>
        </div>
        <div className="right">
          <Map
            lat={this.state.lat}
            lng={this.state.lng}
            updateCoords={this.updateCoords}
            isMarkerShown={true}
          />
        </div>
      </div>
    )

  }
}

LocationPage.propTypes = {
  updateCoords: PropTypes.func
}

export default LocationPage
