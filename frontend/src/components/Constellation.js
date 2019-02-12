import React from "react"
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
