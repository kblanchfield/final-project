import React, { Component } from 'react'

class Location extends Component {

  render() {

    return (
      <div>
        Click on your location.
        {this.props.weatherMessage}
      </div>
    )

  }
}

export default Location
