import React from "react"
import PropTypes from "prop-types"
import * as d3 from "d3"
import Slice from "./Slice"

const DonutChart = ({ data }) => {

  const height = 400
  const width = 500

  let pie = d3.pie()(data)

  return (
    <svg height={height} width={width}>
      <g transform={`translate(${width / 2},${height / 2})`}>
        <Slice pie={pie} />
      </g>
    </svg>
  )
}

export default DonutChart

DonutChart.propTypes = {
  data: PropTypes.array
}
