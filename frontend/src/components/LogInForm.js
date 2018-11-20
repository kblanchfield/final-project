import React, { Component } from "react"
import PropTypes from "prop-types"

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
        <h4>LOG IN</h4>
        <form className="loginForm" onSubmit={this.submitForm}>
          <label htmlFor="username">Username: </label>
          <input name="username" type="text" onChange={this.handleFormUpdate} />
          <br />
          <label htmlFor="password">Password: </label>
          <input name="password" type="password" onChange={this.handleFormUpdate} />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }

}

export default LogInForm

LogInForm.propTypes = {
  onLogin: PropTypes.func
}
