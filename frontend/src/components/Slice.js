import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import * as d3 from "d3";

const Slice = props => {

  let arc = d3
    .arc()
    .innerRadius(65)
    .outerRadius(130);

  let interpolate = d3.interpolateRgb("#eaaf79", "#bc3358");

  return props.pie.map((slice, index) => {
    let sliceColor = interpolate(index / (props.pie.length - 1));

    return <path d={arc(slice)} fill={sliceColor} />;
  });
};

export default Slice

Slice.propTypes = {
  pie: PropTypes.array
}
