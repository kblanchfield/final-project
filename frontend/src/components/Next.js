import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { LinkWrapper } from "../styledComponents/NextStyles"


const Next = ({ link, text }) => (

  <LinkWrapper>
    <Link to={link}>{text}</Link>
  </LinkWrapper>

)

Next.propTypes = {
  link: PropTypes.string,
  text: PropTypes.string
}

export default Next
