import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import * as d3 from "d3"

const SliceWrapper = styled.path`
  transition: all 1s;
`

const Slice = ({ pie }) => {

  let arc = d3
    .arc()
    .innerRadius(65)
    .outerRadius(130)

  const colors = ["#a0ced9", "#83a9b2"]

  return (
    pie.map((slice, index) => {
    return <SliceWrapper d={arc(slice)} fill={colors[index]} key={index} ></SliceWrapper>
    })
  )
  
}

export default Slice

Slice.propTypes = {
  pie: PropTypes.array
}
