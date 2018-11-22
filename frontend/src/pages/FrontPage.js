import React, { Component } from "react"
import styled from "styled-components"
import Particles from "react-particles-js"
import LogInForm from "../components/LogInForm"
import SignUpForm from "../components/SignUpForm"

const FrontPageWrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 30px);
  background-image: url("https://i.pinimg.com/originals/82/2d/fc/822dfcf697e7473a61897965791da389.jpg");
  background-size: cover;
  filter: opacity(0.8);
  position: relative;
`

const TextOverlay = styled.div`
  position: relative;
  width: 100%;
  margin: 0px auto;
  z-index: 2;
`

const Title = styled.h1`
  font-family: "Lily Script One", cursive;
  font-size: 100px;
  color: #F0F0F0;
  letter-spacing: 3px;
  text-align: center;
  padding-top: 150px;
  margin: 0px;
  @media (max-width: 600px) {
    font-size: 50px;
    margin: 0px 10px;
    padding-top: 50px;
  }
`

const Subtitle = styled.h3`
  font-family: "Helvetica", sans-serif;
  font-size: 30px;
  color: #F0F0F0;
  text-align: center;
  padding: 0px;
  margin: 0px;
  @media (max-width: 600px) {
    font-size: 20px;
    margin: 0px 10px;
  }
`

const Forms = styled.div`
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  font-family: "Helvetica", sans-serif;
  font-size: 14px;
  color: #F0F0F0;
  text-align: center;
  padding: 0px;
  margin: 40px auto;
  @media (max-width: 600px) {
    width: 80%
    justify-content: space-between;
  }
`
const particleParams = {
  "particles": {
      "number": {
          "value": 80,
          "density": {
              "enable": true,
              "value_area": 1500
          }
      },
      "color": {
        "value": "#FFFFFF"
      },
      "line_linked": {
          "enable": true,
          "opacity": 0.5
      },
      "move": {
          "direction": "right",
          "speed": 0.4
      },
      "size": {
          "value": 1.5
      },
      "opacity": {
          "anim": {
              "enable": true,
              "speed": 1,
              "opacity_min": 1
          }
      }
  },
  "retina_detect": true
}

const particlesStyle = {
  "position": "absolute",
  "width": "100%",
  "height": "100%",
  "z-index": 1
}

class FrontPage extends Component {

render() {
  console.log(window.innerWidth)
    return (
      <FrontPageWrapper>
        <Particles params={particleParams} style={particlesStyle} />
        <TextOverlay>
          <Title>Collect the stars</Title>
          <Subtitle>Predict which stars will be in your sky tonight</Subtitle>
          <Forms>
            <LogInForm onLogin={this.props.onLogin} />
            <SignUpForm onLogin={this.props.onLogin} />
          </Forms>
        </TextOverlay>
      </FrontPageWrapper>
    )
  }
}

export default FrontPage
