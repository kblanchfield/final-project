import React from "react"
import PropTypes from "prop-types"
import { BodyText } from "../styledComponents/LocationTextStyles"


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
