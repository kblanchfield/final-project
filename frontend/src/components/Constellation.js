import React, { Component } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

const ConstellationImage = styled.img`
  width: 33.33%;
  object-fit: contain;
  object-position: center;
  display: inline;
  min-width: 150px;
  filter: ${props => props.collectedStars ? "opacity(0.25)" : "opacity(1)"};
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
  collectedStars: PropTypes.array,
  onClick: PropTypes.func
}

export default Constellation
