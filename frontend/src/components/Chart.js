import React, { Component } from 'react'
import PropTypes from "prop-types"
import { scaleBand, scaleLinear } from 'd3-scale'
import Axes from "./Axes"
import Bars from "./Bars"

export default class Chart extends Component {

  render() {

    const data = [
      {
        clouds: this.props.data[0],
        day: "tonight"
      },
      {
        clouds: this.props.data[1],
        day: "tomorrow night"
      },
      {
        clouds: this.props.data[2],
        day: "in 2 nights"
      },
      {
        clouds: this.props.data[3],
        day: "in 3 nights"
      },
      {
        clouds: this.props.data[4],
        day: "in 4 nights"
      }
    ]

    const margins = { top: 50, right: 50, bottom: 50, left: 50 }
    const svgDimensions = { width: 600, height: 500 }

    // scaleBand type
    const xScale = scaleBand()
      .padding(0.5)
      .domain(data.map(d => d.day))
      .range([margins.left, svgDimensions.width - margins.right])

     // scaleLinear type
    const yScale = scaleLinear()
      .domain([0, 100])
      .range([svgDimensions.height - margins.bottom, margins.top])

    return (
      <svg width={svgDimensions.width} height={svgDimensions.height}>
        {this.props.data.length > 0 ?
           [<Axes
            scales={{ xScale, yScale }}
            margins={margins}
            svgDimensions={svgDimensions}
            />,
            <Bars
            scales={{ xScale, yScale }}
            margins={margins}
            data={data}
            svgDimensions={svgDimensions}
          />]
          :
          null
        }
        <defs>
          <linearGradient id="myGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" className="start" />
              <stop offset="100%" className="end" />
          </linearGradient>
        </defs>
      </svg>
    )
  }
}

Chart.propTypes = {
  data: PropTypes.array
}
