import React from "react"
import { Link } from "react-router-dom"
import { FooterWrapper } from "../styledComponents/FooterStyles"


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
