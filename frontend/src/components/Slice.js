import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import * as d3 from "d3"

const SliceWrapper = styled.path`
  transition: all 1s;
`

const Slice = props => {

  let arc = d3
    .arc()
    .innerRadius(65)
    .outerRadius(130)

  let interpolate = d3.interpolateRgb("#a0ced9", "#83a9b2")

  return (
    props.pie.map((slice, index) => {
    let sliceColor = interpolate(index / (props.pie.length - 1))
    return <SliceWrapper d={arc(slice)} fill={sliceColor} key={index} ></SliceWrapper>
    })
  )
}

export default Slice

Slice.propTypes = {
  pie: PropTypes.array
}
