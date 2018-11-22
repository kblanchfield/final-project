import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import styled from "styled-components"
import PropTypes from "prop-types"

const Heading = styled.h4`
  font-family: "Helvetica", sans-serif;
  font-size: 14px;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: right;
  margin: 10px;
`

const Label = styled.label`
  font-family: "Lily Script One", cursive;
  font-family: "Helvetica", sans-serif;
  font-size: 14px;
  letter-spacing: 2px;
  text-align: left;
  margin: 0px;
`

const Input = styled.input`
  padding: 7px;
  margin: 7px 0px;
`

const Button = styled.button`
  font-family: "Helvetica", sans-serif;
  font-size: 14px;
  text-transform: uppercase;
  border: 1px solid black;
  border-radius: 20px;
  padding: 10px;
  margin: 7px 0px;
  &:hover {
    color: #EFEFEF;
    background-color: black;
  }
`

class LogInForm extends Component {

  state = {
    username: "",
    password: "",
    isLoggedIn: false
  }

  handleFormUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitForm = event => {
    event.preventDefault()
    const userDetails = {
      username: this.state.username,
      password: this.state.password
    }
    fetch("https://collect-the-stars.herokuapp.com/sessions", {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => (
        response.json()
      ))
      .then(result => {
        sessionStorage.setItem("accessToken", result.accessToken)
        this.setState({
          isLoggedIn: true,
          collectedStars: result.collectedStars
        }, () => {this.props.onLogin(this.state.isLoggedIn, this.state.collectedStars) })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div>
        <Heading>LOG IN</Heading>
        <form className="loginForm" onSubmit={this.submitForm}>
          <Label htmlFor="username">Username: </Label>
          <Input name="username" type="text" onChange={this.handleFormUpdate} ></Input>
          <br />
          <Label htmlFor="password">Password: </Label>
          <Input name="password" type="password" onChange={this.handleFormUpdate} ></Input>
          <br />
          <Button type="submit">Submit</Button>
        </form>
        {this.state.isLoggedIn ? (
          <Redirect to="/location"/>
        ) : (
          null
        )}
      </div>
    )
  }

}

export default LogInForm

LogInForm.propTypes = {
  onLogin: PropTypes.func
}
