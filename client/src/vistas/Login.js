import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/login.css';  // Para los estilos de fondo

class Signin extends Component {
    state = {
        email: 'admin2@example.com',
        password: 'contraseña123'
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        try {            
            const response = await axios.post('http://localhost:5000/api/usuarios/login', { email, password });

            console.log("response");
            console.log(response.status);

            if (response.status==200){
                console.log(response.data);
                localStorage.setItem('user', JSON.stringify(response.data));
                //localStorage.setItem('user', response.data); // Almacena el usuario  
                localStorage.setItem('token', response.data.token); // Almacena el token  
                this.props.navigate('/home'); // Va al panel de control
            }
            
            //localStorage.setItem('token', response.data.token); // Almacena el token
            //this.props.navigate('/home'); // Va al panel de control
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    render() {
        return (
            <div className="d-flex align-items-center justify-content-center min-vh-100 gradient-background">
                <div className="card p-4 shadow-lg" style={{ width: '434px', height: '700px', borderRadius: '22px' }}>
                    <h4 className="mb-4 text-center">Login</h4>
                    <form onSubmit={this.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your Email"
                                className="form-control text_input"
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                className="form-control text_input"
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mt-4">
                            LOG IN
                        </button>
                    </form>
                    <p className="text-center text-muted mt-3">Sebas Corp 2024</p>
                </div>
            </div>
        );
    }
}

export default function SigninWithNavigate() {
    const navigate = useNavigate();
    return <Signin navigate={navigate} />;
}
