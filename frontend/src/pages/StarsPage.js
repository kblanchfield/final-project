import React, { Component } from 'react'
import Constellation from "../components/Constellation"

class StarsPage extends Component {

  state = {
    longitude: 18.0686,
    latitude: 59.3293,
    lstHours: 3,
    lstMins: 48,
    visibleStars: []
  }

  componentDidMount() {
    const url = `http://localhost:8080/stars?latitude=${this.state.latitude}&lstHours=${this.state.lstHours}`
    fetch(url)
      .then(response => response.json())
      .then(json => {
        this.setState({
          visibleStars: json
        })
      })
  }

  render() {

    return (
      <div className="page">
        <div className="left">
          There are 88 recognised constellations in the night sky.
          In ---- you'll see ---.
          And --- you haven't seen before.
        </div>
        <div className="right">
          {this.state.visibleStars.map(constellation => {
            return <Constellation constellation={constellation} />
          })}
        </div>
      </div>
    )

  }
}

export default StarsPage
