import React, { Component, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/login.css";
import { Container, Row, Col, Form, Accordion, Button, Alert  } from 'react-bootstrap';

function Login() {

    const [errorLogin, setErrorLogin] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onFormSubmit = (e) => {
        e.preventDefault();
        //console.log("values");
        //console.log(e.target.email);
        /*
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append('title','John');
        let i=0;
        // @ts-ignore
        for (let [key, value] of formData.entries()) {
            console.log(i++,key, value);
        }
        */
    };
    
    /*
    state = {
        email: '',
        password: '',
        errorLogin: "si"
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
*/
    /*
        xs en el telefono
        sm en el tablet
        md en el computador con pantalla normal
        lg en el computador grande
    */

    const handleChangeEmail = (value) => {
        setEmail(value);
    }

    const handleChangePassword = (value) => {
        setPassword(value);
    }

    const handleSubmit = async () => {
        try {

            console.log(email);
            console.log(password);

            const values = {
                email: "admin@example.com",
                password: "contraseña123"
            };

            //setErrorLogin(true);
            const response = await axios.post('http://localhost:5000/api/usuarios/login', values);
            console.log("resultado response");
            console.log(response);
            console.log('en login');
        } catch (error) {
            console.error('Error al crear el cliente:', error);
        }
    };

    return (
        <Container>
            <Row className='login'>
                <Col>
                    <Row>
                        <Col>
                            <h4>Login</h4>            
                            {
                                errorLogin ? 
                                <Alert variant={"danger"}>
                                    Usuario y/o clave incorrecto
                                </Alert>
                                : null
                            }                                                    
                        </Col>
                    </Row>
                    <Row>                    
                        <Col md={12} style={{fontSize: 20}}>
                            <Form onSubmit={onFormSubmit}
                            >
                                <div className="text_area">                                
                                    <Form.Control 
                                        type="email" 
                                        id="email"
                                        name="email"
                                        //value={email}
                                        placeholder="Enter your Email"
                                    />
                                </div>
                                <div className="text_area">
                                    <Form.Control 
                                        type="password" 
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                    />                                        
                                </div>
                                <Button 
                                    variant="success"
                                    type="submit"
                                    //onClick={handleSubmit}
                                >
                                    LOG IN
                                </Button>                                    
                            </Form>
                        </Col>                   
                    </Row>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Accordion Item #1</Accordion.Header>
                            <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Accordion Item #2</Accordion.Header>
                            <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                        </Accordion>
                </Col>
            </Row>                
        </Container>
    );
    
}

/*
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

*/
/*
export default function SigninWithNavigate() {
    const navigate = useNavigate();
    return <Signin navigate={navigate} />;
}
    */
export default Login;