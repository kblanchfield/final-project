import React from 'react'
import { Link } from "react-router-dom"

const Footer = () => {

  return (
    <div className="footer">
      <Link to="/">Home</Link>
      <Link to="/location">Location</Link>
      <Link to="/stars">Stars</Link>
      <Link to="/map">Chart</Link>
    </div>
  )

  }

export default Footer
