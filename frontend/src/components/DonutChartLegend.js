import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Box = styled.div`
  height: 10px;
  width: 10px;
  display: inline-block;
  background-color: ${props => props.collected ? "#a0ced9" : "#83a9b2"};
`

const DonutChartLegend = () => {

  return (
    <div>
      <Box collected={true}></Box> Constellations you've collected
      <Box colected={false}></Box> Constellations you haven't collected yet
    </div>
  )
}

export default DonutChartLegend

DonutChartLegend.propTypes = {
  data: PropTypes.array
}
