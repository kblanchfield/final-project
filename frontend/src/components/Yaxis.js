import React, { Component } from 'react'
import * as d3Axis from 'd3-axis'
import { select as d3Select } from 'd3-selection'

export default class Axis extends Component {

  componentDidMount() {
    this.renderAxis()
  }

  renderAxis() {
    const axis = d3Axis.axisLeft()
      .scale(this.props.scale)
      .tickSize(-this.props.tickSize)
      .tickPadding([12])
      .ticks([6])

    d3Select(this.axisElement).call(axis)
  }

  render() {
    return (
      <g
        className="Axis Axis-Left"
        ref={(el) => { this.axisElement = el; }}
        transform={this.props.translate}
      />
    )
  }
}
