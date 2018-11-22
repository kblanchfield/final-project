import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Box = styled.div`
  height: 10px;
  width: 10px;
  display: inline-block;
  background-color: ${props => props.collected ? "#a0ced9" : "#83a9b2"};
`

const Label = styled.div`
  display: inline-block;
  font-family: "Space Mono", sans-serif;
  font-size: 12px;
`

const DonutChartLegend = () => {

  return (
    <div>
      <Box collected={true}></Box> <Label>Constellations you've collected</Label>
      <br />
      <Box colected={false}></Box> <Label>Constellations you haven't collected yet</Label>
    </div>
  )
}

export default DonutChartLegend

DonutChartLegend.propTypes = {
  data: PropTypes.array
}
