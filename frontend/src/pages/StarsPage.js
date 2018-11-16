import React, { Component } from "react"
import PropTypes from "prop-types"
import Constellation from "../components/Constellation"
import Moment from "react-moment"

// es5 usage
const moment = require("moment")

class StarsPage extends Component {

  state = {
    visibleStars: [],
    collectedStars: []
  }

  componentDidMount() {
    this.getVisibleConstellations()
  }

  calculateSideRealTime = () => {
    // calculations
    const UT = moment().utc() // needs to be midnight tonight
    console.log(UT)

    // days since 2000
    let today = moment()
    let J2000 = moment("2000-01-01 24:00:00.000")
    let daysSince2000 = today.diff(J2000, "days", true)
    console.log("daysSince2000", daysSince2000)

    let greenwichst = (280.46061837 + (360.98564736629 * daysSince2000)) % 360
    console.log("Greenwich ST", greenwichst)

    let localst = (greenwichst + this.props.lng) % 360
    console.log("Local ST", localst)

    let lst = (localst / 360) * 24
    console.log(lst)

    //const lst = 100.46 + (0.985647 * daysSince2000) + this.props.lng + (15 * UT)

    const lstHours = Math.round(lst)
    console.log(lstHours)
    return ({
      lstHours: lstHours
    })
  }

  getVisibleConstellations= () => {
    const time = this.calculateSideRealTime()
    console.log(time.lstHours)
    const url = `http://localhost:8080/stars?latitude=${this.props.lat}&lstHours=${time.lstHours}`
    fetch(url)
      .then(response => response.json())
      .then(json => {
        this.setState({
          visibleStars: json
        })
      })
      .catch(err => console.log("error:", err))
  }

  render() {

    if (this.state.visibleStars.length > 0) {
      return (
        <div className="page">
          <div className="left">
            There are 88 recognised constellations in the night sky.
            In {this.props.lat} you'll see ---- constellations.
            And --- you haven't seen before.
          </div>
          <div className="right">
            {this.state.visibleStars.map(constellation =>
               <Constellation
                constellation={constellation}
                key={constellation}
               />
            )}
          </div>
        </div>
      )
    } else {
      return (
        <div className="page">
          <div className="left">
            There are 88 recognised constellations in the night sky.
            From the North Pole you'll see ---- constellations.
          </div>
          <div className="right">
            Right
          </div>
        </div>
      )
    }

  }
}

StarsPage.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number
}

export default StarsPage
