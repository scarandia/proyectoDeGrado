import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Login.css";

class Signin extends Component {
  state = {
    email: "",
    password: "",
    errorMessage: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      const response = await axios.post(
        "http://localhost:5000/api/usuarios/login",
        { email, password }
      );
      if (response.status === 200) {
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
        sessionStorage.setItem("token", response.data.token);
        this.props.navigate("/home");
      }
    } catch (error) {
      this.setState({
        errorMessage: "Email o contraseña incorrectos. Por favor, inténtalo de nuevo.",
      });
    }
  };

  render() {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="login-card">
          <h4 className="text-center">Bienvenido!</h4>
          {this.state.errorMessage && (
            <div className="alert alert-danger" role="alert">
              {this.state.errorMessage}
            </div>
          )}
          <form onSubmit={this.handleSubmit}>
            <div className="mb-3 mt-5">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Ingrese su Email"
                className="form-control"
                onChange={this.handleChange}
                required
                autoComplete="email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Ingrese su Contraseña"
                className="form-control"
                onChange={this.handleChange}
                required
                autoComplete="current-password"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-3">
              Iniciar Sesión
            </button>
            <p className="text-center text-muted mt-5">Made with &lt;3</p>
          </form>
        </div>
      </div>
    );
  }
}

export default function SigninWithNavigate() {
  const navigate = useNavigate();
  return <Signin navigate={navigate} />;
}