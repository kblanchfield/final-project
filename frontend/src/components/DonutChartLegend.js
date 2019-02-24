import React from "react"
import { Box, Label } from "../styledComponents/DonutChartLegendStyles"


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
