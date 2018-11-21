import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import PropTypes from "prop-types"
import styled from "styled-components"

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
    fetch("https://collect-the-stars.herokuapp.com/users", {
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
