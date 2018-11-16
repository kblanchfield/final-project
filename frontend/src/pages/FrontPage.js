import React, { Component } from 'react'
import { Link } from "react-router-dom"

class FrontPage extends Component {

  render() {

    return (
      <div className="front-page">
        <div className="title">
          <h1>Collect the stars</h1>
          <h3>Predict which stars will be in your sky tonight</h3>
          <Link to="/location">Location</Link>
          <br />
          <Link to="/stars">Stars</Link>
          <br />
          <Link to="/map">Star chart</Link>
        </div>
      </div>
    );

  }
}

export default FrontPage
