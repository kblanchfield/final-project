import React, { Component } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const BodyText = styled.p`
color: black;
font-family: "Helvetica", sans-serif;
font-size: 20px;
margin: 20px;
`

class LocationText extends Component {

  render() {

    return (
      <div>
        <BodyText>
          {this.props.text}
        </BodyText>
      </div>
    )

  }
}

LocationText.propTypes = {
  text: PropTypes.string
}

export default LocationText
