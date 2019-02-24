import React from "react"
import PropTypes from "prop-types"
import { ConstellationImage } from "../styledComponents/ConstellationImage"


const Constellation = ({ constellation, onClick, collectedStars }) => {

  const handleClick = e => {
    onClick(constellation)
  }

  return (
    <ConstellationImage
      collectedStars={collectedStars.includes(constellation)}
      src={"./images/" + constellation + ".png"}
      alt={constellation}
      onClick={handleClick}
    >
    </ConstellationImage>
  )

}

Constellation.propTypes = {
  constellation: PropTypes.string,
  collectedStars: PropTypes.array,
  onClick: PropTypes.func
}

export default Constellation
