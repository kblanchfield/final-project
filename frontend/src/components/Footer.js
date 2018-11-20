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
  a {
    color: black;
    text-decoration: none;
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
