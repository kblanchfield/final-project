import React, { Component } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import LocationText from "../components/LocationText"
import BarChart from "../components/BarChart"
import Map from "../components/Map"

const LocationPageWrapper = styled.div`
  width: 100vw;
  min-height: calc(100vh - 30px);
  display: flex;
  flex-direction: row;
  overflow: hidden;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`

const LocationLeftWrapper = styled.div`
  width: 50%;
  background-color: #EFEFEF;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
  @media (max-width: 900px) {
    width: 100%;
  }
`

const ChartTitle = styled.div`
  margin: 20px 20px 0px 20px;
  font-family: "Space Mono", sans-serif;
  font-size: 14px;
  color: black;
  text-align: left;
`

const LocationRightWrapper = styled.div`
  width: 50%;
  height: 100%;
  background-color: #EFEFEF;
  @media (max-width: 900px) {
    width: 100%;
  }
`

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
