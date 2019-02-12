import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const BodyText = styled.p`
color: black;
font-family: "Space Mono", "Helvetica", sans-serif;
font-size: 20px;
margin: 20px;
`

const LocationText = ({ text }) => {

  return (
    <div>
      <BodyText>
        {text}
      </BodyText>
    </div>
  )

}

LocationText.propTypes = {
  text: PropTypes.string
}

export default LocationText
