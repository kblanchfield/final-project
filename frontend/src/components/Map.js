import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';


class MyMap extends Component {

  state = {
    lng: 18.063240,
    lat: 59.334591
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

  styles = [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]

  render() {
    return (
      <div>
        <Map
          google={this.props.google}
          style={{ width: "50%", height: "100%"}}
          initialCenter={{
            lat: this.state.lat,
            lng: this.state.lng
          }}
          zoom={5}
          onClick={this.updateCoords}
          styles={this.styles}
        >
        <Marker position={{ lat: this.state.lat, lng: this.state.lng }} />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyA6g_kl3pYSj2LZmS4SXoYzGpIPJA_MxeY")
})(MyMap);
