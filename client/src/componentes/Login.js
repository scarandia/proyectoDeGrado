import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/login.css";
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

function Login() {
    const [errorLogin, setErrorLogin] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleChangeEmail = (value) => {
        setEmail(value);
    };

    const handleChangePassword = (value) => {
        setPassword(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const values = { email, password };
            const response = await axios.post('http://192.168.84.21:5000/api/usuarios/login', { email, password });
            console.log("resultado response", response);
            // Aquí puedes manejar el éxito, como redirigir al usuario
        } catch (error) {
            setErrorLogin(true);
            console.error('Error al iniciar sesión:', error);
        }
    };

    return (
        <Container>
            <Row className='login'>
                <Col>
                    <Row>
                        <Col>
                            <h4>Login</h4>
                            {errorLogin &&
                                <Alert variant="danger">
                                    Usuario y/o clave incorrecto
                                </Alert>
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} style={{ fontSize: 20 }}>
                            <Form onSubmit={handleSubmit}>
                                <div className="text_area">
                                    <Form.Control
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your Email"
                                        onChange={(e) => handleChangeEmail(e.target.value)}
                                    />
                                </div>
                                <div className="text_area">
                                    <Form.Control
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        onChange={(e) => handleChangePassword(e.target.value)}
                                    />
                                </div>
                                <Button
                                    variant="success"
                                    type="submit"
                                >
                                    LOG IN
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;