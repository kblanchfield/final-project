import React, { Component } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import StarsText from "../components/StarsText"
import Constellation from "../components/Constellation"
import DonutChart from "../components/DonutChart"
import DonutChartLegend from "../components/DonutChartLegend"

const StarsPageWrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 30px);
  display: flex;
  flex-direction: row;
  overflow: hidden;
  @media (max-width: 900px) {
    height: auto;
    flex-direction: column;
  }
`

const StarsLeftWrapper = styled.div`
  width: 50%;
  background-color: #EFEFEF;
  text-align: center;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
  @media (max-width: 900px) {
    width: 100%;
  }
`

const ChartTitle = styled.div`
  margin: 20px 20px 0px 20px;
  font-family: "Space Mono", sans-serif;
  font-size: 14px;
  color: black;
  text-align: left;
`

const StarsBackground = styled.div`
  width: 50%;
  height: 100%;
  overflow: scroll;
  line-height: 0px;
  background-image: url("http://cdn.eso.org/images/screen/magellan-ch17-bardon-cc.jpg");
  background-position: left top;
  text-align: center;
  @media (max-width: 900px) {
    width: 100%;
  }
`

class StarsPage extends Component {

  state = {
    visibleStars: []
  }

  componentDidMount() {
    this.setState({
      collectedStars: this.props.collectedStars || []
    })
    this.getVisibleConstellations()
  }

  getVisibleConstellations = () => {
    const time = this.calculateSideRealTime()
    const url = `https://collect-the-stars.herokuapp.com/stars?latitude=${this.props.lat}&lstHours=${time.lstHours}`
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
      const url = `https://collect-the-stars.herokuapp.com/constellations/remove`
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
      const url = `https://collect-the-stars.herokuapp.com/constellations/add`
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
    const LST_hours_GMT = 3
    const LST_mins_GMT = 51
    const LST_decimal_GMT = LST_hours_GMT + (LST_mins_GMT/60)
    let LST_decimal_local = LST_decimal_GMT + (this.props.lng/360 * 24)
    if (LST_decimal_local < 0) {
      LST_decimal_local += 24
    } else if (LST_decimal_local > 24) {
      LST_decimal_local -= 24
    }
    const LST_hours = parseInt(LST_decimal_local)
    const LST_mins = (LST_decimal_local % LST_hours) * 60
    return ({
      lstHours: LST_hours
    })
  }

  render() {

    if (this.state.visibleStars.length > 0) {
      return (
        <StarsPageWrapper>
          <StarsLeftWrapper>
            <StarsText
              numVisibleStars={this.state.visibleStars.length}
              numMissingStars={this.state.visibleStars.length - this.state.collectedStars.length}
            />
            {this.props.isLoggedIn ?
              <div>
                {/*<ChartTitle>Collected star constellations</ChartTitle>*/}
                <DonutChart
                  data={[88 - this.state.collectedStars.length, this.state.collectedStars.length]}
                 />
                <DonutChartLegend />
              </div>
               :
              <div></div>
            }
          </StarsLeftWrapper>
          <StarsBackground>
            {this.state.visibleStars.map(constellation =>
               <Constellation
                constellation={constellation}
                key={constellation}
                collectedStars={this.state.collectedStars}
                onClick={this.updateCollectedStars}
               />
            )}
          </StarsBackground>
        </StarsPageWrapper>
      )
    } else {
      return (
        <StarsPageWrapper>
          <div className="left">
            There are 88 recognised constellations in the night sky.
          </div>
          <div className="right">
          </div>
        </StarsPageWrapper>
      )
    }

  }
}

StarsPage.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
  collectedStars: PropTypes.array,
  isLoggedIn: PropTypes.bool
}

export default StarsPage
