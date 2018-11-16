import React from 'react'
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

const Next = (props) => (
  <Link to={props.link}>{props.text}</Link>
)

Next.propTypes = {
  link: PropTypes.string,
  text: PropTypes.string
}

export default Next
