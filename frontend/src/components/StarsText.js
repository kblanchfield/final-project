import React, { Component } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const BodyText = styled.p`
color: black;
font-family: "Helvetica", sans-serif;
font-size: 20px;
margin: 20px;
`

class StarsText extends Component {

  render() {

    return (
      <div>
        <BodyText>
          There are 88 recognised constellations in the night sky.
          Tonight you'll see {this.props.numVisibleStars} constellations.
          That's {this.props.numMissingStars} star constellations you haven't collected yet!
        </BodyText>
      </div>
    )

  }
}

StarsText.propTypes = {
  numConstellations: PropTypes.number,
  numMissingStars: PropTypes.number,
  numVisibleStars: PropTypes.number
}

export default StarsText
