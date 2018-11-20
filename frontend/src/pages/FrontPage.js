import React, { Component } from "react"
import styled from "styled-components"
import LogInForm from "../components/LogInForm"
import SignUpForm from "../components/SignUpForm"

const FrontPageWrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 30px);
  background-image: url("https://i.pinimg.com/originals/82/2d/fc/822dfcf697e7473a61897965791da389.jpg");
  background-size: cover;
  filter: opacity(0.8);
`

const Title = styled.h1`
  font-family: "Lily Script One", cursive;
  font-size: 100px;
  color: #F0F0F0;
  letter-spacing: 3px;
  text-align: center;
  padding-top: 150px;
  margin: 0px;
`

const Subtitle = styled.h3`
  font-family: "Helvetica", sans-serif;
  font-size: 30px;
  color: #F0F0F0;
  text-align: center;
  padding: 0px;
  margin: 0px;
`

class FrontPage extends Component {

  render() {
    return (
      <FrontPageWrapper>
          <Title>Collect the stars</Title>
          <Subtitle>Predict which stars will be in your sky tonight</Subtitle>
            <LogInForm onLogin={this.props.onLogin} />
            <SignUpForm onLogin={this.props.onLogin} />
      </FrontPageWrapper>
    )
  }
}

export default FrontPage
