import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Alert from "../alert/Alert";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password1: "",
      password2: "",
      redirect: false,
      userRegAlert: false,
      userRegMsg: "",
      userRegTheme: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    this.setState({
      userRegAlert: false,
    });
    if (this.state.password1 !== this.state.password2) {
      this.setState({
        userRegMsg: "Password confirmation failed!",
        userRegAlert: true,
        userRegTheme: "danger",
      });
    } else {
      if (
        this.state.name.trim() !== "" &&
        this.state.password1 === this.state.password2 &&
        this.state.email.trim() !== ""
      ) {
        try {
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: this.state.name,
              email: this.state.email.toLowerCase(),
              password: this.state.password1,
            }),
          };
          await fetch("http://localhost:5000/user/newUser", requestOptions);
          this.setState({
            userRegMsg: "You have successfully registered!",
            userRegAlert: true,
            userRegTheme: "success",
            name: "",
            email: "",
            password1: "",
            password2: "",
          });
        } catch (e) {
          console.log(e);
        }
      } else {
        this.setState({
          userRegMsg: "Plese fill the following fields!",
          userRegAlert: true,
          userRegTheme: "danger",
        });
      }
    }
  }
  hideAlert() {
    this.setState({
      userRegAlert: false,
      userRegTheme: "",
    });
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="container">
        <br />
        <br />
        <Alert
          show={this.state.userRegAlert}
          theme={this.state.userRegTheme}
          msg={this.state.userRegMsg}
          hideAlert={this.hideAlert}
        />
        <div className="row">
          <form className="mt-5 col-lg-6 mx-auto" onSubmit={this.handleSubmit}>
            <div class="form-group row">
              <p>
                Already have an account? Quickly{" "}
                <a href="login">
                  <strong>sign in</strong>
                </a>{" "}
                for your account now.
              </p>
            </div>
            <div class="form-group row">
              <label for="inputEmail3" class="col-sm-2 col-form-label">
                Name
              </label>
              <div class="col-sm-10">
                <input
                  type="text"
                  name="name"
                  onChange={this.handleChange}
                  class="form-control"
                  id="inputEmail3"
                  value={this.state.name}
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="inputEmail3" class="col-sm-2 col-form-label">
                Email
              </label>
              <div class="col-sm-10">
                <input
                  type="email"
                  name="email"
                  onChange={this.handleChange}
                  class="form-control"
                  id="inputEmail3"
                  value={this.state.email}
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="inputPassword3" class="col-sm-2 col-form-label">
                Password
              </label>
              <div class="col-sm-10">
                <input
                  type="password"
                  name="password1"
                  onChange={this.handleChange}
                  class="form-control"
                  id="inputPassword3"
                  value={this.state.password1}
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="inputPassword3" class="col-sm-2 col-form-label">
                Confirmation
              </label>
              <div class="col-sm-10">
                <input
                  type="password"
                  name="password2"
                  onChange={this.handleChange}
                  class="form-control"
                  id="inputPassword3"
                  value={this.state.password2}
                />
              </div>
            </div>

            <div class="form-group">
              <div class=" mx-auto">
                <button type="submit" class="btn btn-success col-3 mt-2">
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
