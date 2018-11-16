import React from 'react'
import { Link } from "react-router-dom"

const Next = (props) => (
  <Link to={props.link}>{props.text}</Link>
)

export default Next
