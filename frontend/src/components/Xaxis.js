import React, { Component } from 'react'
import PropTypes from "prop-types"
import * as d3Axis from 'd3-axis'
import { select as d3Select } from 'd3-selection'

export default class Xaxis extends Component {

  componentDidMount() {
    this.renderAxis()
  }

  renderAxis() {
    const axis = d3Axis.axisBottom()
      .scale(this.props.scales.xScale)
      .tickSize(-(this.props.svgDimensions.height - this.props.margins.top - this.props.margins.bottom))
      .tickPadding([12])
      .ticks([6])

    d3Select(this.axisElement).call(axis)
  }

  render() {
    return (
      <g
        className="Axis Axis-Bottom"
        ref={(el) => { this.axisElement = el; }}
        transform={`translate(0, ${this.props.svgDimensions.height - this.props.margins.bottom})`}
      />
    )
  }
}

Xaxis.propTypes = {
  scales: PropTypes.object,
  margins: PropTypes.object,
  svgDimensions: PropTypes.object
}
