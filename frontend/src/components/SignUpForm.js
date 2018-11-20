import React, { Component } from "react"
import PropTypes from "prop-types"

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
        <h4>CREATE A NEW ACCOUNT</h4>
        <form className="signupForm" onSubmit={this.submitForm}>
          <label htmlFor="username">Username: </label>
          <input name="username" type="text" onChange={this.handleFormUpdate} />
          <br />
          <label htmlFor="password">Password: </label>
          <input name="password" type="password" onChange={this.handleFormUpdate} />
          <br />
          <button type="submit">Submit</button>
        </form>
        {this.state.isLoggedIn ?
          <p>You're in! Go to LOCATION to start calculating the stars in your sky!</p>
          :
          <p></p>
        }
      </div>
    )
  }

}

export default SignUpForm

SignUpForm.propTypes = {
  onLogin: PropTypes.func
}
