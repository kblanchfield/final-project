import React from "react"
import PropTypes from "prop-types"
import { BodyText } from "../styledComponents/StarsTextStyles"


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
