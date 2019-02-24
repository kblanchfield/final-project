import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import PropTypes from "prop-types"
import { Heading, Label, Input, Button } from "../styledComponents/LoginFormStyles"


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
    fetch("http://localhost:8080/sessions", {
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
