import React, { Component } from "react"
import PropTypes from "prop-types"
import * as d3Axis from "d3-axis"
import { select as d3Select } from "d3-selection"

export default class Yaxis extends Component {

  componentDidMount() {
    this.renderAxis()
  }

  renderAxis() {
    const axis = d3Axis.axisLeft()
      .scale(this.props.scales.yScale)
      .tickSize(-(this.props.svgDimensions.width - this.props.margins.left - this.props.margins.right))
      .tickPadding([12])
      .ticks([6])

    d3Select(this.axisElement).call(axis)
  }

  render() {
    return (
      <g
        className="Axis Axis-Left"
        ref={(el) => { this.axisElement = el; }}
        transform={`translate(${this.props.margins.left}, 0)`}
      />
    )
  }
}

Yaxis.propTypes = {
  scales: PropTypes.object,
  margins: PropTypes.object,
  svgDimensions: PropTypes.object
}
