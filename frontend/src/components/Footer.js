import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

const FooterWrapper = styled.div`
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #EFEFEF;
  z-index: 2px;
  a {
    font-family: "Space Mono", sans-serif;
    color: black;
    text-decoration: none;
    &:active {
      border: 1px solid black;
    }
  }
`

const Footer = () => {

  return (
    <FooterWrapper>
      <Link to="/">Home</Link>
      <Link to="/location">Location</Link>
      <Link to="/stars">Stars</Link>
    </FooterWrapper>
  )

}

export default Footer
