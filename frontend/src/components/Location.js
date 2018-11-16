import React, { Component } from "react"
import PropTypes from "prop-types"

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

Location.propTypes = {
  weatherMessage: PropTypes.string
}

export default Location
