import React, { Component } from "react"
import PropTypes from "prop-types"
import StarsText from "../components/StarsText"
import Constellation from "../components/Constellation"
import DonutChart from "../components/DonutChart"
import DonutChartLegend from "../components/DonutChartLegend"
import { StarsPageWrapper, StarsLeftWrapper, StarsBackground } from "../styledComponents/StarsPageStyles"
import { getVisibleConstellations } from "../utils/getVisibleConstellations"


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

  getVisibleConstellations = async () => {
    const visibleStars = await getVisibleConstellations(this.props.lat, this.props.lng)
    this.setState({
      visibleStars
    })
  }

  updateCollectedStars = constellation => {
    if (this.props.isLoggedIn) {
      const accessToken = sessionStorage.getItem("accessToken")
      const body = {accessToken: accessToken, constellation: constellation}
      const url = `http://localhost:8080/constellations`
      fetch(url, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({
            collectedStars: json.collectedStars
          })
        })
        .catch(err => console.log("err: ", err))
      }
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
            (This page uses the free Heroku hosting service, so it might take up to 30 seconds to fully load!)
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
