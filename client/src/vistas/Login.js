import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/login.css';  // Para los estilos de fondo

class Signin extends Component {
    state = {
        email: '',
        password: '',
        errorMessage: '' // Estado para el mensaje de error
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        try {            
            const response = await axios.post('http://localhost:5000/api/usuarios/login', { email, password });

            if (response.status === 200) {
                localStorage.setItem('user', JSON.stringify(response.data));
                localStorage.setItem('token', response.data.token);
                this.props.navigate('/home'); // Va al panel de control
            }
        } catch (error) {
            // Establecer el mensaje de error si ocurre un fallo
            this.setState({ errorMessage: 'Email o contraseña incorrectos. Por favor, inténtalo de nuevo.' });
        }
    };

    render() {
        return (
            <div className="d-flex align-items-center justify-content-center min-vh-100 gradient-background">
                <div className="card p-4 shadow-lg" style={{ width: '434px', height: '700px', borderRadius: '22px' }}>
                    <h4 className="mb-4 text-center">Iniciar Sesión</h4>
                    {this.state.errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            {this.state.errorMessage}
                        </div>
                    )}
                    <form onSubmit={this.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Ingrese su Email"
                                className="form-control text_input"
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Ingrese su Contraseña"
                                className="form-control text_input"
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mt-4">
                            LOG IN
                        </button>
                        <p className="text-center text-muted mt-3">Made with &lt;3</p>
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