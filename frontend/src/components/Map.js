import React, { Component } from 'react'
import PropTypes from "prop-types"
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'
import { mapStyles } from "../styledComponents/MapStyles"

class MyMap extends Component {

  state = {
    lng: 18.063240,
    lat: 59.334591
  }

  componentDidMount(){
    this.setState({
      lng: this.props.lng,
      lat: this.props.lat
    })
  }

  updateCoords = (t, map, coord) => {
    const { latLng } = coord
    const lat = latLng.lat()
    const lng = latLng.lng()
    this.setState({
      lng,
      lat
    }, () => this.props.updateCoords(lat, lng))
  }

  mapWidth = () => {
    if (window.innerWidth < 900) {
      return "100%"
    } else {
      return "50%"
    }
  }

  render() {
    return (
      <div>
        <Map
          google={this.props.google}
          containerStyle={{ width: this.mapWidth(), height: `calc(100% - 30px)` }}
          initialCenter={{ lat: this.state.lat, lng: this.state.lng }}
          zoom={5}
          onClick={this.updateCoords}
          styles={mapStyles}
        >
        <Marker
          icon={{ url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }}
          position={{ lat: this.state.lat, lng: this.state.lng }}
          mapCenter={{ lat: this.state.lat, lng: this.state.lng }} />
        </Map>
      </div>
    )
  }
}

MyMap.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
  updateCoords: PropTypes.func
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyA6g_kl3pYSj2LZmS4SXoYzGpIPJA_MxeY")
})(MyMap)
