import React, { Component } from 'react'
import PropTypes from "prop-types"

export default class Bars extends Component {

  render() {
    const { scales, margins, data, svgDimensions } = this.props
    const { xScale, yScale } = scales
    const { height } = svgDimensions

    const bars = (
      data.map(datum =>
        <rect
          key={datum.day}
          x={xScale(datum.day)}
          y={yScale(datum.clouds)}
          height={height - margins.bottom - scales.yScale(datum.clouds)}
          width={xScale.bandwidth()}
          className="bar"
        />,
      )
    )

    return (
      <g>{bars}</g>
    )
  }
}

Bars.propTypes = {
  scales: PropTypes.object,
  margins: PropTypes.object,
  data: PropTypes.array,
  svgDimensions: PropTypes.object
}
