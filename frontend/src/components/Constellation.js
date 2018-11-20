import React, { Component } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

const ConstellationImage = styled.img`
  width: 33%;
  height: auto;
  object-fit: cover;
  object-position: center;
  display: inline;
  filter: ${props => props.collectedStars ? "opacity(0.5)" : "opacity(1)"};
`

class Constellation extends Component {

  onClick = e => {
    this.props.onClick(this.props.constellation)
  }

  render() {
    return (
      <ConstellationImage
        collectedStars={this.props.collectedStars.includes(this.props.constellation)}
        src={"./images/" + this.props.constellation + ".png"}
        alt={this.props.constellation}
        onClick={this.onClick}
      >
      </ConstellationImage>
    )
  }
}

Constellation.propTypes = {
  constellation: PropTypes.string,
  collectedStars: PropTypes.array
}

export default Constellation
