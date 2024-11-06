import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../styles/login.css";

class Signin extends Component {
    render() {
        return (
            <div className="login">
                <h4>Login</h4>
                <form>
                    <div className="text_area">
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your Username"
                            className="text_input"

                        />
                    </div>
                    <div className="text_area">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            className="text_input"

                        />
                    </div>
                    <Link to='/home'>
                        <input
                            type="submit"
                            value="LOG IN"
                            className="btn"
                        />
                    </Link>
                </form>
                <p style={{ color: "grey" }}>Sebas Corp 2024</p>
            </div>
        )
    }
}

export default Signin;