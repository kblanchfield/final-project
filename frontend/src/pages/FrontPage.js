import React from "react"
import PropTypes from "prop-types"
import Particles from "react-particles-js"
import LogInForm from "../components/LogInForm"
import SignUpForm from "../components/SignUpForm"

import { FrontPageWrapper, TextOverlay, Title, Subtitle, Forms, particlesParams, particlesStyle } from "../styledComponents/FrontPageStyles"

const FrontPage = ({ onLogin }) => {

  return (
    <FrontPageWrapper>
      <Particles params={particlesParams} style={particlesStyle} />
      <TextOverlay>
        <Title>Collect the stars</Title>
        <Subtitle>Predict which stars will be in your sky tonight</Subtitle>
        <Forms>
          <LogInForm onLogin={onLogin} />
          <SignUpForm onLogin={onLogin} />
        </Forms>
      </TextOverlay>
    </FrontPageWrapper>
  )
}

FrontPage.propTypes = {
  onLogin: PropTypes.func.isRequired
}

export default FrontPage
