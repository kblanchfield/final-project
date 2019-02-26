import React, { Component } from "react"
import PropTypes from "prop-types"
import LocationText from "../components/LocationText"
import BarChart from "../components/BarChart"
import Map from "../components/Map"
import { LocationPageWrapper,  LocationLeftWrapper, ChartTitle, LocationRightWrapper } from "../styledComponents/LocationPageStyles"
import { getWeatherData } from "../utils/getWeatherData"

class LocationPage extends Component {

  state = {
    lng: 18.063240,
    lat: 59.334591,
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

  getWeather = async () => {
    const { lat, lng } = this.state
    const weatherData = await getWeatherData(lat, lng)
    this.setState({
      midnightCloudCover: weatherData.midnightCloudCover,
      weatherMessage: weatherData.weatherMessage
    })
  }


  render() {
    const { lat, lng, weatherMessage, midnightCloudCover } = this.state

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
