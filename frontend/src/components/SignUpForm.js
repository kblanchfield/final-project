import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import PropTypes from "prop-types"
import { Heading, Label, Input, Button } from "../styledComponents/LoginFormStyles"


class SignUpForm extends Component {

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
    fetch("http://localhost:8080/users", {
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
        if (result.created === true) {
          console.log("Success:", JSON.stringify(result))
          this.setState({
            isLoggedIn: true
          }, () => {this.props.onLogin(this.state.isLoggedIn)})
        } else {
          console.log("Failure:", JSON.stringify(result))
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div>
        <Heading>NEW USER</Heading>
        <form className="signupForm" onSubmit={this.submitForm}>
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

export default SignUpForm

SignUpForm.propTypes = {
  onLogin: PropTypes.func
}
