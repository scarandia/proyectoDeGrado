import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/login.css";

class Signin extends Component {
    state = {
        email: '',
        password: ''
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token); // Almacenar el token
            this.props.navigate('/home'); // Navegar a la página principal
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    render() {
        return (
            <div className="login">
                <h4>Login</h4>
                <form onSubmit={this.handleSubmit}>
                    <div className="text_area">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your Email"
                            className="text_input"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="text_area">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            className="text_input"
                            onChange={this.handleChange}
                        />
                    </div>
                    <input
                        type="submit"
                        value="LOG IN"
                        className="btn"
                    />
                </form>
                <p style={{ color: "grey" }}>Sebas Corp 2024</p>
            </div>
        );
    }
}

export default function SigninWithNavigate() {
    const navigate = useNavigate();
    return <Signin navigate={navigate} />;
}