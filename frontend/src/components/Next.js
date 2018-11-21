import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

const LinkWrapper = styled.div`
  text-decoration: none;
  cursor: pointer;
  color: purple;
  display: block;
  margin: 10px auto;
`

const Next = (props) => (
  <LinkWrapper>
    <Link to={props.link}>{props.text}</Link>
  </LinkWrapper>
)

Next.propTypes = {
  link: PropTypes.string,
  text: PropTypes.string
}

export default Next
