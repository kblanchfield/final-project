import React from 'react'
import Yaxis from "./Yaxis"
import Xaxis from "./Xaxis"

export default ({ scales, margins, svgDimensions }) => {
  const { height, width } = svgDimensions

  return (
    <g>
      <Yaxis
        scale={scales.yScale}
        translate={`translate(${margins.left}, 0)`}
        tickSize={width - margins.left - margins.right}
      />
      <Xaxis
        scale={scales.xScale}
        translate={`translate(0, ${height - margins.bottom})`}
        tickSize={height - margins.top - margins.bottom}
      />
    </g>
  )
}
