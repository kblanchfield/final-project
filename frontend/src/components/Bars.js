import React, { Component } from "react"
import PropTypes from "prop-types"
import { BarWrapper } from "../styledComponents/BarStyle"


class Bars extends Component {

  render() {
    const { data, scales, margins, svgDimensions } = this.props
    const { xScale, yScale } = scales
    const { height } = svgDimensions

    return (
      <>
        {data.map(datum =>
          <BarWrapper
            key={datum.day}
            x={xScale(datum.day)}
            y={yScale(datum.clouds)}
            height={height - margins.bottom - scales.yScale(datum.clouds)}
            width={xScale.bandwidth()}
          >
          </BarWrapper>
        )}
      </>
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
