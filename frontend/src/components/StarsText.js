import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const BodyText = styled.p`
  color: black;
  font-family: "Space Mono", "Helvetica", sans-serif;
  font-size: 20px;
  margin: 20px;
  text-align: left;
`

const StarsText = ({ numVisibleStars, numMissingStars })  => {

  return (
    <>
      <BodyText>
        There are 88 recognised constellations in the night sky.
        <br />
        <br />
        Tonight you'll see {numVisibleStars} constellations.
        That's {numMissingStars} star constellations you haven't collected yet!
      </BodyText>
    </>
  )

}

StarsText.propTypes = {
  numMissingStars: PropTypes.number,
  numVisibleStars: PropTypes.number
}

export default StarsText
