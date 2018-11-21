import React, { Component } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import Constellation from "../components/Constellation"
import DonutChart from "../components/DonutChart"
import Next from "../components/Next"

const StarsPageWrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 30px);
  display: flex;
  flex-direction: row;
  overflow: hidden;
`

class StarsPage extends Component {

  state = {
    visibleStars: []
    // missingStars: []
  }

  componentDidMount() {
    this.setState({
      collectedStars: this.props.collectedStars
    })
    this.getVisibleConstellations()
  }

  getVisibleConstellations = () => {
    const time = this.calculateSideRealTime()
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

  updateCollectedStars = constellation => {
    const accessToken = sessionStorage.getItem("accessToken")
    console.log(accessToken)
    console.log(constellation)
    const body = {accessToken: accessToken, constellation: constellation}
    if (this.state.collectedStars.includes(constellation)) {
      console.log("constellation IS already in state.collectedStars")
      const url = `http://localhost:8080/constellations/remove`
      fetch(url, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(json => {
          this.setState({
            collectedStars: json.collectedStars
          })
        })
        .catch(err => console.log("error:", err))
      } else {
      console.log("constellation not already in state.collectedStars")
      const url = `http://localhost:8080/constellations/add`
      fetch(url, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(json => {
          this.setState({
            collectedStars: json.collectedStars
          })
        })
        .catch(err => console.log("error:", err))
      }
  }


  calculateSideRealTime = () => {
    // calculations
    // //const UT = moment().utc() // needs to be midnight tonight
    // //console.log(UT)
    // const UT = 0 // midnight in Stockholm is 23 in UT
    // console.log("UT: ", UT)
    //
    // const longitude = this.props.lng
    // console.log("longitude: ", longitude)
    //
    // //days since 2000
    // let today = moment("2018-12-01 00:00:00")
    // let today_2 = moment("2018-12-01 12:00:00")
    // let J2000 = moment("2000-01-01 12:00:00")
    // let daysSince2000 = today.diff(J2000, "days", true)
    // console.log("daysSince2000: ", daysSince2000)
    // let daysSince2000_2 = today_2.diff(J2000, "days", true)
    // console.log("daysSince2000_2: ", daysSince2000_2)
    //
    // const T = daysSince2000 / 36525
    // console.log("T: ", T)
    //
    // const T0 = (6.697374558 + (2400.051336 * T) + (0.000025862 * T * T)) % 24
    // console.log("T0: ", T0)

    const LST_hours_GMT = 3
    const LST_mins_GMT = 51
    const LST_decimal_GMT = LST_hours_GMT + (LST_mins_GMT/60)
    console.log("LST_decimal_GMT: ", LST_decimal_GMT)

    let LST_decimal_local = LST_decimal_GMT + (this.props.lng/360 * 24)
    if (LST_decimal_local < 0) {
      LST_decimal_local += 24
    } else if (LST_decimal_local > 24) {
      LST_decimal_local -= 24
    }
    const LST_hours = parseInt(LST_decimal_local)
    const LST_mins = (LST_decimal_local % LST_hours) * 60
    console.log("LST_decimal_local: ", LST_decimal_local)
    console.log("LST_hours_local: ", LST_hours)
    console.log("LST_mins_local: ", LST_mins)


    //
    // let greenwichst = (280.46061837 + (360.98564736629 * daysSince2000)) % 360
    // console.log("Greenwich ST", greenwichst)
    //
    // let localst = (greenwichst + this.props.lng) % 360
    // console.log("Local ST", localst)
    //
    // let lst = (localst / 360) * 24
    // console.log(lst)

    // const lst = 100.46 + (0.985647 * daysSince2000) + this.props.lng + (15 * UT)
    // console.log("lst: ", lst)
    //
    // const calc = (lst * 24) % 24
    // console.log("calc: ", calc)
    //
    // const lstHours = Math.round(lst)
    // console.log(lstHours)
    return ({
      lstHours: LST_hours
    })
  }

  render() {

    if (this.state.visibleStars.length > 0) {
      return (
        <StarsPageWrapper>
          <div className="left">
            There are 88 recognised constellations in the night sky.
            Tonight you'll see {this.state.visibleStars.length} constellations.
            That's {this.state.visibleStars.length - this.state.collectedStars.length} star constellations you haven't collected yet!
            <DonutChart
              data={[88, this.state.visibleStars.length - this.state.collectedStars, this.state.collectedStars ]}
             />
            <Next link="/location" text="Pick another location" />
          </div>
          <div className="right">
            {this.state.visibleStars.map(constellation =>
               <Constellation
                constellation={constellation}
                key={constellation}
                collectedStars={this.state.collectedStars}
                onClick={this.updateCollectedStars}
               />
            )}
          </div>
        </StarsPageWrapper>
      )
    } else {
      return (
        <StarsPageWrapper>
          <div className="left">
            There are 88 recognised constellations in the night sky.
          </div>
          <div className="right">
            ...
          </div>
        </StarsPageWrapper>
      )
    }

  }
}

StarsPage.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
  collectedStars: PropTypes.array
}

export default StarsPage
