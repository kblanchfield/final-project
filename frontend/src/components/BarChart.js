import React, { Component } from 'react'
import PropTypes from "prop-types"
import { scaleBand, scaleLinear } from 'd3-scale'
import Xaxis from "./Xaxis"
import Yaxis from "./Yaxis"
import Bars from "./Bars"

class BarChart extends Component {

state = {
      data: [
        {
          clouds: 0,
          day: "tonight"
        },
        {
          clouds: 0,
          day: "tomorrow night"
        },
        {
          clouds: 0,
          day: "in 2 nights"
        },
        {
          clouds: 0,
          day: "in 3 nights"
        },
        {
          clouds: 0,
          day: "in 4 nights"
        }
      ]
    }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        data: [
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
      })
    }
  }

  chartWidth = () => {
    if (window.innerWidth < 900) {
      return window.innerWidth - 20
    } else {
      return (window.innerWidth - 20) / 2
    }
  }


  render() {
    const margins = { top: 50, right: 50, bottom: 50, left: 50 }
    const svgDimensions = { width: this.chartWidth(), height: 400 }

    // scaleBand type
    const xScale = scaleBand()
      .padding(0.5)
      .domain(this.state.data.map(d => d.day))
      .range([margins.left, svgDimensions.width - margins.right])

     // scaleLinear type
    const yScale = scaleLinear()
      .domain([0, 100])
      .range([svgDimensions.height - margins.bottom, margins.top])


      return (
        <svg width={svgDimensions.width} height={svgDimensions.height}>
            <Xaxis
             scales={{ xScale, yScale }}
             margins={margins}
             svgDimensions={svgDimensions}
             />,
             <Yaxis
              scales={{ xScale, yScale }}
              margins={margins}
              svgDimensions={svgDimensions}
              />,
              <Bars
              scales={{ xScale, yScale }}
              margins={margins}
              data={this.state.data}
              svgDimensions={svgDimensions}
            />
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

export default BarChart

BarChart.propTypes = {
  data: PropTypes.array
}
