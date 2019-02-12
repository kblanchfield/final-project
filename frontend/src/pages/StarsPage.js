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
    const body = {accessToken: accessToken, constellation: constellation}
    if (this.state.collectedStars.includes(constellation)) {
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
    return ({
      lstHours: LST_hours
    })
  }

  render() {
    const { visibleStars, collectedStars } = this.state

    if (visibleStars.length > 0) {
      return (
        <StarsPageWrapper>
          <StarsLeftWrapper>
            <StarsText
              numVisibleStars={visibleStars.length}
              numMissingStars={visibleStars.length - collectedStars.length}
            />
            {this.props.isLoggedIn ?
              <div>
                <DonutChart
                  data={[88 - collectedStars.length, collectedStars.length]}
                 />
                <DonutChartLegend />
              </div>
               :
              <div></div>
            }
          </StarsLeftWrapper>
          <StarsBackground>
            {visibleStars.map(constellation =>
               <Constellation
                constellation={constellation}
                key={constellation}
                collectedStars={collectedStars}
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
            <br />
            <br />
            (This page uses the free Heroku hosting service on the backend, so it might take up to 30 seconds to fully load!)
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
