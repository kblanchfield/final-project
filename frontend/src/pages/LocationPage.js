import React, { Component } from "react"
import PropTypes from "prop-types"
import LocationText from "../components/LocationText"
import BarChart from "../components/BarChart"
import Map from "../components/Map"
import { LocationPageWrapper,  LocationLeftWrapper, ChartTitle, LocationRightWrapper } from "../styledComponents/LocationPageStyles"


class LocationPage extends Component {

  state = {
    lat: 0,
    lng: 0,
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

  componentDidMount() {
    this.setState({
      lat: this.props.lat,
      lng: this.props.lng
    })
    this.getWeather()
  }

  getWeather = () => {
    const { lat,  lng } = this.state

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&APPID=ee4066bbc82305811aecd61e6c30d861`)
      .then(response =>
      response.json())
      .then(json => {
        if(json.list !== undefined) {
          const midnightCloudCover = json.list.filter(time => /00:00:00/.test(time.dt_txt)).map(day => day.clouds.all)
          this.setState({
            midnightCloudCover
          })
        }
      })
      .then(() => {
        const { midnightCloudCover } = this.state

        let weatherMessage = ""
        if (midnightCloudCover[0] < 50) {
          weatherMessage = `Good news! Looks like it will be a clear sky at midnight tonight - perfect for seeing the stars.`
        } else if (midnightCloudCover[1] < 50) {
          weatherMessage = `There's a ${midnightCloudCover[0]}% chance of clouds tonight. It looks like it will be a clearer sky tomorrow night.`
        } else if (midnightCloudCover[2] < 50) {
          weatherMessage = `There's a ${midnightCloudCover[0]}% chance of clouds tonight. It looks like it will be a clearer sky in 2 nights.`
        } else if (midnightCloudCover[3] < 50) {
          weatherMessage = `There's a ${midnightCloudCover[0]}% chance of clouds tonight. It looks like it will be a clearer sky in 3 nights.`
        } else if (midnightCloudCover[4] < 50) {
          weatherMessage = `There's a ${midnightCloudCover[0]}% chance of clouds tonight. It looks like it will be a clearer sky in 4 nights.`
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
    const { lat,  lng, weatherMessage, midnightCloudCover } = this.state

    return (
      <LocationPageWrapper>
        <LocationLeftWrapper>
          <LocationText text={weatherMessage} />
          <ChartTitle>Chances of clouds</ChartTitle>
          <BarChart data={midnightCloudCover} />
        </LocationLeftWrapper>
        <LocationRightWrapper>
          <Map
            lat={lat}
            lng={lng}
            updateCoords={this.updateCoords}
          />
        </LocationRightWrapper>
      </LocationPageWrapper>
    )

  }
}

LocationPage.propTypes = {
  updateCoords: PropTypes.func,
  lat: PropTypes.number,
  lng: PropTypes.number
}

export default LocationPage
