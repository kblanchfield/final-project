import React, { Component } from "react"
import PropTypes from "prop-types"
import { BarWrapper } from "../styledComponents/BarStyle"


class Bars extends Component {

  render() {
    const { scales, margins, data, svgDimensions } = this.props
    const { xScale, yScale } = scales
    const { height } = svgDimensions

    const bars = (
      data.map(datum =>
        <BarWrapper
          key={datum.day}
          x={xScale(datum.day)}
          y={yScale(datum.clouds)}
          height={height - margins.bottom - scales.yScale(datum.clouds)}
          width={xScale.bandwidth()}
        >
        </BarWrapper>
      )
    )

    return (
      <g>{bars}</g>
    )
  }
}

export default Bars

Bars.propTypes = {
  scales: PropTypes.object,
  margins: PropTypes.object,
  data: PropTypes.array,
  svgDimensions: PropTypes.object
}
